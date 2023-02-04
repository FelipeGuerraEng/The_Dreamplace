import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Funding, FundingStatus } from './funding';

interface DreamticketAttrs {
  id: string;
  title: string;
  userName: string;
  price: number;
}

export interface DreamticketDoc extends mongoose.Document {
  title: string;
  userName: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface DreamticketModel extends mongoose.Model<DreamticketDoc> {
  build(attrs: DreamticketAttrs): DreamticketDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<DreamticketDoc | null>;
}

const dreamticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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

dreamticketSchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return Dreamticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
dreamticketSchema.statics.build = (attrs: DreamticketAttrs) => {
  return new Dreamticket({
    _id: attrs.id,
    title: attrs.title,
    userName: attrs.userName,
    price: attrs.price,
  });
};
dreamticketSchema.methods.isReserved = async function () {
  // this === the dreamticket document that we just called 'isReserved' on
  const existingFunding = await Funding.findOne({
    dreamticket: this as any,
    status: {
      $in: [
        FundingStatus.Created,
        FundingStatus.AwaitingPayment,
        FundingStatus.Complete,
      ],
    },
  });

  return !!existingFunding;
};

const Dreamticket = mongoose.model<DreamticketDoc, DreamticketModel>(
  'Dreamticket',
  dreamticketSchema
);

export { Dreamticket };
