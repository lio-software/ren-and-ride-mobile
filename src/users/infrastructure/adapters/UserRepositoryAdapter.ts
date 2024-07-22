import { Platform } from "react-native";
import { axiosInstance } from "../../../shared/infrastructure/api/apiConfig";
import IUserRepositoryPort from "../../application/ports/IUserRepositoryPort";
import UserEntity from "../../domain/entities/UserEntity";
import { JwtPayload, jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CustomJwtPayload extends JwtPayload {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    uuid: string;
    phoneNumber: string;
    imageUrl: string;
  },
  type: string;
  createdAt: string;
  updatedAt: string;
}

class UserRepositoryAdapter implements IUserRepositoryPort {
  async authenticate(email: string, password: string): Promise<UserEntity> {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });

      const { accessToken, refreshToken } = response.data.data;

      const decodedAccessToken = jwtDecode<CustomJwtPayload>(accessToken);
      const decodedRefreshToken = jwtDecode<CustomJwtPayload>(refreshToken);

      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);

      const foundUser = decodedAccessToken.data;

      return new UserEntity({
        id: foundUser.uuid,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        password: "",
        phoneNumber: foundUser.phoneNumber,
        imageUrl: foundUser.imageUrl
      });
    } catch (error) {
      console.error("Error en la autenticación:", error);
    }
  }

  async create(firstName: string, lastName: string, email: string, password: string, phoneNumber: string): Promise<UserEntity> {
    try {
      const response = await axiosInstance.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      });

      if (response.status !== 201) {
        throw new Error("Error al registrar. Por favor, verifica tus credenciales.");
      } else {
        const user = this.authenticate(email, password);
        return user;
      }

    } catch (error) {
      console.error("Error en el registro:", error);
    }
  }

  async update(user: UserEntity, id: string): Promise<UserEntity> {
    try {

      console.log(user.imageUrl);

      if(user.imageUrl !== "" && user.imageUrl !== null) {
        const uploadedUrls = await this.uploadFiles([user.imageUrl]);
        
        if(uploadedUrls.length > 0) {
          user.imageUrl = uploadedUrls[0];
        } else {
          throw new Error("Error al subir la imagen. Por favor, verifica tus credenciales.");
        }
      }


      const response = await axiosInstance.put(`/users/${id}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        imageUrl: user.imageUrl || "",
        password: user.password
      });      

      if (response.status !== 200) {
        throw new Error("Error al actualizar. Por favor, verifica tus credenciales.");
      } else {
        return user;
      }
    } catch (error) {
    }
  }

  async uploadFiles(uris: string[]): Promise<string[]> {
    try {
    const formData = new FormData();

    console.log('uris', uris);

    uris.forEach((uri, index) => {
      formData.append('files', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        type: 'image/jpeg', // o 'image/png'
        name: `photo_${index}.jpg`,  // Puedes usar un nombre único para cada archivo
      } as any);
    });

      const response = await axiosInstance.post('/vehicles/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload successful:', response.data);

      return response.data.data;
    } catch (error) {
      console.error('Upload failed:', error);
      return Promise.reject(error);
    }
  }
}

export default UserRepositoryAdapter;