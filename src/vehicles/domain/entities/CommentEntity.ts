class CommentEntity {
  uuid: string;
  userId: string;
  vehicleId: string;
  stars: number;
  text: string;

  constructor({ uuid, userId, vehicleId, stars, text }) {
    this.uuid = uuid;
    this.userId = userId;
    this.vehicleId = vehicleId;
    this.stars = stars;
    this.text = text;
  }
}

export default CommentEntity;