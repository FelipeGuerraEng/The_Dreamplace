import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface DreamticketAttrs {
  title: string;
  price: number;
  userId: string;
  userName: string;
}

interface DreamticketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  userName: string;
  version: number;
  fundingId?: string;
}

interface DreamticketModel extends mongoose.Model<DreamticketDoc> {
  build(attrs: DreamticketAttrs): DreamticketDoc;
}

const dreamticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    fundingId: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
dreamticketSchema.set('versionKey', 'version');
dreamticketSchema.plugin(updateIfCurrentPlugin);

dreamticketSchema.statics.build = (attrs: DreamticketAttrs) => {
  return new Dreamticket(attrs);
};

const Dreamticket = mongoose.model<DreamticketDoc, DreamticketModel>(
  'Dreamticket',
  dreamticketSchema
);

export { Dreamticket };
