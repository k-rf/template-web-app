import { DomainPrimitive } from "~/shared/domain/domain-primitive";
import { Entity } from "~/shared/domain/entity";

declare global {
  /**
   * ホバーしたとき、プロパティを読みやすく表示する。
   *
   * REF: https://www.totaltypescript.com/concepts/the-prettify-helper
   */
  type Prettify<T> = { [K in keyof T]: Prettify<T[K]> } extends infer U ? U : never;

  /**
   *  オプショナルな型に変換する
   *
   * NOTE: `exactOptionalPropertyTypes` を有効にし、 `Partial` の定義が変わったため。
   */
  type Optional<T> = {
    [K in keyof T]?: T[K] | undefined;
  };

  type Primitive = boolean | number | string | undefined | null | symbol | bigint;

  /** 属性のキーのみを返す */
  type OnlyProperty<T, K extends keyof T> = T[K] extends CallableFunction
    ? never
    : K extends "type"
    ? never
    : K;

  /** 属性のみを返す */
  type Property<T> = {
    [K in keyof T as OnlyProperty<T, K>]: T[K];
  };

  /** キーを取得できるかどうかを判定する */
  type IsEmpty<T> = keyof { [K in keyof T as OnlyProperty<T, K>]: unknown } extends never
    ? true
    : false;

  /** ドメインオブジェクトからプリミティブなオブジェクトを取得する */
  type Unpack<T> = Prettify<
    IsEmpty<T> extends true
      ? T extends { unpack: () => infer U }
        ? U
        : never
      : {
          [K in keyof T as OnlyProperty<T, K>]: T[K] extends Primitive
            ? T[K]
            : T[K] extends DomainPrimitive<string> | Entity<string>
            ? ReturnType<T[K]["unpack"]>
            : never;
        }
  >;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
  type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
}

export {};
