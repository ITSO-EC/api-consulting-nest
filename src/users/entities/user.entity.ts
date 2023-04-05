import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoPaginate from 'mongoose-paginate-v2';
import { toJSON } from 'src/commons/plugins/toJSON.plugins';
import { encodePassword } from 'src/commons/utils/bcrypt';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoPaginate);
UserSchema.plugin(toJSON);
UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = encodePassword(this.password);
    this.password = hashed;
    return next();
  } catch (error) {
    return next(error);
  }
});
