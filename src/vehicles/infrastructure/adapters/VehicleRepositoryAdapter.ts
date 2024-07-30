import { Platform } from "react-native";
import { axiosInstance } from "../../../shared/infrastructure/api/apiConfig";
import IVehicleRepositoryPort from "../../application/ports/IVehicleRepositoryPort";
import CommentEntity from "../../domain/entities/CommentEntity";
import VehicleEntity from "../../domain/entities/VehicleEntity";

class VehicleRepositoryAdapter implements IVehicleRepositoryPort {
  async create(vehicle: VehicleEntity): Promise<VehicleEntity> {
    try {
      const uploadedUrls = await this.uploadFiles(vehicle.vehicleImages);
      vehicle.vehicleImages = uploadedUrls;

      return axiosInstance.post('/vehicles', vehicle).then((response) => {
        const vehicle = response.data;

        return new VehicleEntity({
          id: vehicle.uuid,
          model: vehicle.model,
          brand: vehicle.brand,
          vehicle_type: vehicle.vehicle_type,
          year: vehicle.year,
          price: vehicle.price,
          vehicleImages: uploadedUrls,
          location: vehicle.location,
          user_id: vehicle.user_id,
          avaliable: vehicle.avalible,
          stars: vehicle.stars,
          description: "",
          color: "",
        });
      });
    } catch (error) {
      console.error("Error al crear un vehiculo:", error);
      return Promise.reject(error);
    }
  }

  async getById(id: string): Promise<VehicleEntity> {
    try {
      const response = await axiosInstance.get(`/vehicles/${id}`);

      const vehicle = response.data.data;

      return new VehicleEntity({
        id: vehicle.uuid,
        model: vehicle.model,
        brand: vehicle.brand,
        vehicle_type: vehicle.type,
        year: vehicle.year,
        price: vehicle.rentalPrice,
        vehicleImages: vehicle.vehicleImages,
        location: vehicle.address,
        user_id: vehicle.userId,
        avaliable: vehicle.avalible,
        stars: vehicle.stars,
        description: vehicle.description,
        color: vehicle.color,
      });
    } catch (error) {
      console.error("Error al obtener un vehiculo por id:", error);
      return Promise.reject(error);
    }
  }

  async list(keyword?: string): Promise<VehicleEntity[]> {
    try {
      console.log('keyword', keyword);
      const response = await axiosInstance.get('/vehicles/get/avalible', {
        params: {
          search: keyword,
        },
      });

      const vehicles = response.data.data;

      return vehicles.map((vehicle: any) => {
        return new VehicleEntity({
          id: vehicle.uuid,
          model: vehicle.model,
          brand: vehicle.brand,
          vehicle_type: vehicle.type,
          year: vehicle.year,
          price: vehicle.rentalPrice,
          vehicleImages: vehicle.vehicleImages,
          location: vehicle.address,
          user_id: vehicle.userId,
          avaliable: vehicle.avalible,
          stars: vehicle.stars,
          description: vehicle.description,
          color: vehicle.color,
        });
      });
    } catch (error) {
      console.error("Error al listar los vehiculos:", error);
      return [];
    }
  }

  async listByUserId(userId: string): Promise<VehicleEntity[]> {
    try {
      const response = await axiosInstance.get(`vehicles/user/${userId}/`);

      const vehicles = response.data.data;

      console.log('vehicles', vehicles);

      return vehicles.map((vehicle: any) => {
        return new VehicleEntity({
          id: vehicle.uuid,
          model: vehicle.model,
          brand: vehicle.brand,
          vehicle_type: vehicle.type,
          year: vehicle.year,
          price: vehicle.rentalPrice,
          vehicleImages: vehicle.vehicleImages,
          location: vehicle.address,
          user_id: vehicle.userId,
          avaliable: vehicle.avalible,
          stars: vehicle.stars,
          description: vehicle.description,
          color: vehicle.color,
        });
      });
    } catch (error) {
      console.error("Error al listar los vehiculos de un usuario:", error);
      return [];
    }
  }

  async update(vehicle: VehicleEntity, id: string): Promise<VehicleEntity> {
    try {
      return axiosInstance.put(`/vehicles/${id}`, vehicle).then((response) => {
        const vehicle = response.data;

        return new VehicleEntity({
          id: vehicle.uuid,
          model: vehicle.model,
          brand: vehicle.brand,
          vehicle_type: vehicle.vehicle_type,
          year: vehicle.year,
          price: vehicle.price,
          vehicleImages: vehicle.vehicleImages,
          location: vehicle.location,
          user_id: vehicle.user_id,
          avaliable: vehicle.avalible,
          stars: vehicle.stars,
          description: "",
          color: "",
        });
      });
    } catch (error) {
      console.error("Error al actualizar un vehiculo:", error);
      return Promise.reject(error);
    }
  }

  async getCommentsByVehicleId(vehicleId: string): Promise<CommentEntity[]> {
    try {
      const response = await axiosInstance.get(`vehicles/${vehicleId}/comment`);

      const comments = response.data.data;

      return comments.map((comment: any) => {
        return new CommentEntity({
          uuid: comment.uuid,
          userId: comment.userId,
          vehicleId: comment.vehicleId,
          text: comment.text,
          stars: comment.stars,
        });
      });
    } catch (error) {
      console.error("Error al obtener los comentarios de un vehiculo:", error);
      return [];
    }
  }

  async rateVehicle(comment: CommentEntity): Promise<void> {
    try {
      const isCorrect = await axiosInstance.post('/sentiment', {
        text: comment.text,
      });

      if (isCorrect.data.data.sentiment === 1) {
        return Promise.reject('El comentario incluye lenguaje inapropiado');
      } else {
        await axiosInstance.post(`/vehicles/${comment.vehicleId}/comment`, {
          vehicleId: comment.vehicleId,
          userId: comment.userId,
          stars: comment.stars,
          text: comment.text,
        });
      }

    } catch (error) {
      console.error("Error al calificar un vehículo:", error);
      return Promise.reject(error);
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
export default VehicleRepositoryAdapter;