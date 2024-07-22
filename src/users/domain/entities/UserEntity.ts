class UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  imageUrl: string;

  constructor({ id, firstName, lastName, email, password, phoneNumber, imageUrl }) {
    this._id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.imageUrl = imageUrl;
  }
}

export default UserEntity;