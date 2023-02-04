import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { FundingStatus } from '@davidhume/commoncodev10';
import { DreamticketDoc } from './dreamticket';

export { FundingStatus };

interface FundingAttrs {
  userId: string;
  status: FundingStatus;
  expiresAt: Date;
  dreamticket: DreamticketDoc;
}

interface FundingDoc extends mongoose.Document {
  userId: string;
  status: FundingStatus;
  expiresAt: Date;
  dreamticket: DreamticketDoc;
  version: number;
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
    status: {
      type: String,
      required: true,
      enum: Object.values(FundingStatus),
      default: FundingStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    dreamticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dreamticket',
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
  return new Funding(attrs);
};

const Funding = mongoose.model<FundingDoc, FundingModel>(
  'Funding',
  fundingSchema
);

export { Funding };
