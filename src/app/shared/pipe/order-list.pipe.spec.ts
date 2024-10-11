import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Test data input and output', () => {
    const pipe = new OrderListPipe();
    const {data}:any = (mockRaw as any).default
    const result:TrackModel[] = pipe.transform(data)

    expect(result).toEqual(data);
  });

  
});
