import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { FundingStatus } from '@davidhume/commoncodev10';

interface FundingAttrs {
  id: string;
  version: number;
  userId: string;
  price: number;
  status: FundingStatus;
}

interface FundingDoc extends mongoose.Document {
  version: number;
  userId: string;
  price: number;
  status: FundingStatus;
}

interface FundingModel extends mongoose.Model<FundingDoc> {
  build(attrs: FundingAttrs): FundingDoc;
}

const fundingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
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

fundingSchema.set('versionKey', 'version');
fundingSchema.plugin(updateIfCurrentPlugin);

fundingSchema.statics.build = (attrs: FundingAttrs) => {
  return new Funding({
    _id: attrs.id,
    version: attrs.version,
    price: attrs.price,
    userId: attrs.userId,
    status: attrs.status,
  });
};

const Funding = mongoose.model<FundingDoc, FundingModel>(
  'Funding',
  fundingSchema
);

export { Funding };
