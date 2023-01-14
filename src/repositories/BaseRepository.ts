import { Sequelize, Op, literal, fn, col} from "sequelize";

export abstract class BaseRepository {
  public readonly Op: typeof Op;
  public readonly model: any;
  public readonly literal: typeof literal;
  public readonly fn: typeof fn;
  public readonly col: typeof col;

  constructor(model: any) {
    this.model = model;
    this.Op = Op;
    this.literal = literal;
    this.fn = fn;
    this.col = col;
  }
}