
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model UserEvent
 * 
 */
export type UserEvent = $Result.DefaultSelection<Prisma.$UserEventPayload>
/**
 * Model Challenge
 * 
 */
export type Challenge = $Result.DefaultSelection<Prisma.$ChallengePayload>
/**
 * Model UserChallenge
 * 
 */
export type UserChallenge = $Result.DefaultSelection<Prisma.$UserChallengePayload>
/**
 * Model XpTransaction
 * 
 */
export type XpTransaction = $Result.DefaultSelection<Prisma.$XpTransactionPayload>
/**
 * Model Pass
 * 
 */
export type Pass = $Result.DefaultSelection<Prisma.$PassPayload>
/**
 * Model FriendActivity
 * 
 */
export type FriendActivity = $Result.DefaultSelection<Prisma.$FriendActivityPayload>
/**
 * Model RecentActivity
 * 
 */
export type RecentActivity = $Result.DefaultSelection<Prisma.$RecentActivityPayload>
/**
 * Model LeaderboardEntry
 * 
 */
export type LeaderboardEntry = $Result.DefaultSelection<Prisma.$LeaderboardEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Tier: {
  GENERAL: 'GENERAL',
  LOYAL: 'LOYAL',
  SUPERFAN: 'SUPERFAN',
  ELITE: 'ELITE'
};

export type Tier = (typeof Tier)[keyof typeof Tier]


export const EventCategory: {
  MUSIC: 'MUSIC',
  SPORTS: 'SPORTS',
  THEATER: 'THEATER',
  COMEDY: 'COMEDY',
  OTHER: 'OTHER'
};

export type EventCategory = (typeof EventCategory)[keyof typeof EventCategory]


export const PassStatus: {
  AVAILABLE: 'AVAILABLE',
  CLAIMED: 'CLAIMED',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED'
};

export type PassStatus = (typeof PassStatus)[keyof typeof PassStatus]


export const Period: {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  ALL_TIME: 'ALL_TIME'
};

export type Period = (typeof Period)[keyof typeof Period]

}

export type Tier = $Enums.Tier

export const Tier: typeof $Enums.Tier

export type EventCategory = $Enums.EventCategory

export const EventCategory: typeof $Enums.EventCategory

export type PassStatus = $Enums.PassStatus

export const PassStatus: typeof $Enums.PassStatus

export type Period = $Enums.Period

export const Period: typeof $Enums.Period

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userEvent`: Exposes CRUD operations for the **UserEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserEvents
    * const userEvents = await prisma.userEvent.findMany()
    * ```
    */
  get userEvent(): Prisma.UserEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Challenges
    * const challenges = await prisma.challenge.findMany()
    * ```
    */
  get challenge(): Prisma.ChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userChallenge`: Exposes CRUD operations for the **UserChallenge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserChallenges
    * const userChallenges = await prisma.userChallenge.findMany()
    * ```
    */
  get userChallenge(): Prisma.UserChallengeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.xpTransaction`: Exposes CRUD operations for the **XpTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more XpTransactions
    * const xpTransactions = await prisma.xpTransaction.findMany()
    * ```
    */
  get xpTransaction(): Prisma.XpTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pass`: Exposes CRUD operations for the **Pass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passes
    * const passes = await prisma.pass.findMany()
    * ```
    */
  get pass(): Prisma.PassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendActivity`: Exposes CRUD operations for the **FriendActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendActivities
    * const friendActivities = await prisma.friendActivity.findMany()
    * ```
    */
  get friendActivity(): Prisma.FriendActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recentActivity`: Exposes CRUD operations for the **RecentActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecentActivities
    * const recentActivities = await prisma.recentActivity.findMany()
    * ```
    */
  get recentActivity(): Prisma.RecentActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.leaderboardEntry`: Exposes CRUD operations for the **LeaderboardEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaderboardEntries
    * const leaderboardEntries = await prisma.leaderboardEntry.findMany()
    * ```
    */
  get leaderboardEntry(): Prisma.LeaderboardEntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Event: 'Event',
    UserEvent: 'UserEvent',
    Challenge: 'Challenge',
    UserChallenge: 'UserChallenge',
    XpTransaction: 'XpTransaction',
    Pass: 'Pass',
    FriendActivity: 'FriendActivity',
    RecentActivity: 'RecentActivity',
    LeaderboardEntry: 'LeaderboardEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "event" | "userEvent" | "challenge" | "userChallenge" | "xpTransaction" | "pass" | "friendActivity" | "recentActivity" | "leaderboardEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      UserEvent: {
        payload: Prisma.$UserEventPayload<ExtArgs>
        fields: Prisma.UserEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          findFirst: {
            args: Prisma.UserEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          findMany: {
            args: Prisma.UserEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          create: {
            args: Prisma.UserEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          createMany: {
            args: Prisma.UserEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          delete: {
            args: Prisma.UserEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          update: {
            args: Prisma.UserEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          deleteMany: {
            args: Prisma.UserEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>[]
          }
          upsert: {
            args: Prisma.UserEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserEventPayload>
          }
          aggregate: {
            args: Prisma.UserEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserEvent>
          }
          groupBy: {
            args: Prisma.UserEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserEventCountArgs<ExtArgs>
            result: $Utils.Optional<UserEventCountAggregateOutputType> | number
          }
        }
      }
      Challenge: {
        payload: Prisma.$ChallengePayload<ExtArgs>
        fields: Prisma.ChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findFirst: {
            args: Prisma.ChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          findMany: {
            args: Prisma.ChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          create: {
            args: Prisma.ChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          createMany: {
            args: Prisma.ChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          delete: {
            args: Prisma.ChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          update: {
            args: Prisma.ChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          deleteMany: {
            args: Prisma.ChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>[]
          }
          upsert: {
            args: Prisma.ChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChallengePayload>
          }
          aggregate: {
            args: Prisma.ChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChallenge>
          }
          groupBy: {
            args: Prisma.ChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<ChallengeCountAggregateOutputType> | number
          }
        }
      }
      UserChallenge: {
        payload: Prisma.$UserChallengePayload<ExtArgs>
        fields: Prisma.UserChallengeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserChallengeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserChallengeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          findFirst: {
            args: Prisma.UserChallengeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserChallengeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          findMany: {
            args: Prisma.UserChallengeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>[]
          }
          create: {
            args: Prisma.UserChallengeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          createMany: {
            args: Prisma.UserChallengeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserChallengeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>[]
          }
          delete: {
            args: Prisma.UserChallengeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          update: {
            args: Prisma.UserChallengeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          deleteMany: {
            args: Prisma.UserChallengeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserChallengeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserChallengeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>[]
          }
          upsert: {
            args: Prisma.UserChallengeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserChallengePayload>
          }
          aggregate: {
            args: Prisma.UserChallengeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserChallenge>
          }
          groupBy: {
            args: Prisma.UserChallengeGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserChallengeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserChallengeCountArgs<ExtArgs>
            result: $Utils.Optional<UserChallengeCountAggregateOutputType> | number
          }
        }
      }
      XpTransaction: {
        payload: Prisma.$XpTransactionPayload<ExtArgs>
        fields: Prisma.XpTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.XpTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.XpTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          findFirst: {
            args: Prisma.XpTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.XpTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          findMany: {
            args: Prisma.XpTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>[]
          }
          create: {
            args: Prisma.XpTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          createMany: {
            args: Prisma.XpTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.XpTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>[]
          }
          delete: {
            args: Prisma.XpTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          update: {
            args: Prisma.XpTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          deleteMany: {
            args: Prisma.XpTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.XpTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.XpTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>[]
          }
          upsert: {
            args: Prisma.XpTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$XpTransactionPayload>
          }
          aggregate: {
            args: Prisma.XpTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateXpTransaction>
          }
          groupBy: {
            args: Prisma.XpTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<XpTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.XpTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<XpTransactionCountAggregateOutputType> | number
          }
        }
      }
      Pass: {
        payload: Prisma.$PassPayload<ExtArgs>
        fields: Prisma.PassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          findFirst: {
            args: Prisma.PassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          findMany: {
            args: Prisma.PassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>[]
          }
          create: {
            args: Prisma.PassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          createMany: {
            args: Prisma.PassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>[]
          }
          delete: {
            args: Prisma.PassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          update: {
            args: Prisma.PassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          deleteMany: {
            args: Prisma.PassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>[]
          }
          upsert: {
            args: Prisma.PassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PassPayload>
          }
          aggregate: {
            args: Prisma.PassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePass>
          }
          groupBy: {
            args: Prisma.PassGroupByArgs<ExtArgs>
            result: $Utils.Optional<PassGroupByOutputType>[]
          }
          count: {
            args: Prisma.PassCountArgs<ExtArgs>
            result: $Utils.Optional<PassCountAggregateOutputType> | number
          }
        }
      }
      FriendActivity: {
        payload: Prisma.$FriendActivityPayload<ExtArgs>
        fields: Prisma.FriendActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          findFirst: {
            args: Prisma.FriendActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          findMany: {
            args: Prisma.FriendActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>[]
          }
          create: {
            args: Prisma.FriendActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          createMany: {
            args: Prisma.FriendActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>[]
          }
          delete: {
            args: Prisma.FriendActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          update: {
            args: Prisma.FriendActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          deleteMany: {
            args: Prisma.FriendActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>[]
          }
          upsert: {
            args: Prisma.FriendActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendActivityPayload>
          }
          aggregate: {
            args: Prisma.FriendActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendActivity>
          }
          groupBy: {
            args: Prisma.FriendActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendActivityCountArgs<ExtArgs>
            result: $Utils.Optional<FriendActivityCountAggregateOutputType> | number
          }
        }
      }
      RecentActivity: {
        payload: Prisma.$RecentActivityPayload<ExtArgs>
        fields: Prisma.RecentActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecentActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecentActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          findFirst: {
            args: Prisma.RecentActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecentActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          findMany: {
            args: Prisma.RecentActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>[]
          }
          create: {
            args: Prisma.RecentActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          createMany: {
            args: Prisma.RecentActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecentActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>[]
          }
          delete: {
            args: Prisma.RecentActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          update: {
            args: Prisma.RecentActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          deleteMany: {
            args: Prisma.RecentActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecentActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecentActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>[]
          }
          upsert: {
            args: Prisma.RecentActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecentActivityPayload>
          }
          aggregate: {
            args: Prisma.RecentActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecentActivity>
          }
          groupBy: {
            args: Prisma.RecentActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecentActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecentActivityCountArgs<ExtArgs>
            result: $Utils.Optional<RecentActivityCountAggregateOutputType> | number
          }
        }
      }
      LeaderboardEntry: {
        payload: Prisma.$LeaderboardEntryPayload<ExtArgs>
        fields: Prisma.LeaderboardEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaderboardEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaderboardEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          findFirst: {
            args: Prisma.LeaderboardEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaderboardEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          findMany: {
            args: Prisma.LeaderboardEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>[]
          }
          create: {
            args: Prisma.LeaderboardEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          createMany: {
            args: Prisma.LeaderboardEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaderboardEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>[]
          }
          delete: {
            args: Prisma.LeaderboardEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          update: {
            args: Prisma.LeaderboardEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          deleteMany: {
            args: Prisma.LeaderboardEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaderboardEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaderboardEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>[]
          }
          upsert: {
            args: Prisma.LeaderboardEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaderboardEntryPayload>
          }
          aggregate: {
            args: Prisma.LeaderboardEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaderboardEntry>
          }
          groupBy: {
            args: Prisma.LeaderboardEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaderboardEntryCountArgs<ExtArgs>
            result: $Utils.Optional<LeaderboardEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    event?: EventOmit
    userEvent?: UserEventOmit
    challenge?: ChallengeOmit
    userChallenge?: UserChallengeOmit
    xpTransaction?: XpTransactionOmit
    pass?: PassOmit
    friendActivity?: FriendActivityOmit
    recentActivity?: RecentActivityOmit
    leaderboardEntry?: LeaderboardEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    event_interactions: number
    challenge_progress: number
    xp_transactions: number
    friend_activities: number
    recent_activities: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event_interactions?: boolean | UserCountOutputTypeCountEvent_interactionsArgs
    challenge_progress?: boolean | UserCountOutputTypeCountChallenge_progressArgs
    xp_transactions?: boolean | UserCountOutputTypeCountXp_transactionsArgs
    friend_activities?: boolean | UserCountOutputTypeCountFriend_activitiesArgs
    recent_activities?: boolean | UserCountOutputTypeCountRecent_activitiesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEvent_interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChallenge_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserChallengeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountXp_transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: XpTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriend_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRecent_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecentActivityWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    user_events: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_events?: boolean | EventCountOutputTypeCountUser_eventsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountUser_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
  }


  /**
   * Count Type ChallengeCountOutputType
   */

  export type ChallengeCountOutputType = {
    user_challenges: number
  }

  export type ChallengeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_challenges?: boolean | ChallengeCountOutputTypeCountUser_challengesArgs
  }

  // Custom InputTypes
  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeCountOutputType
     */
    select?: ChallengeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChallengeCountOutputType without action
   */
  export type ChallengeCountOutputTypeCountUser_challengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserChallengeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    xp_total: number | null
    streak_days: number | null
    rank: number | null
    percentile: number | null
    events_attended: number | null
  }

  export type UserSumAggregateOutputType = {
    xp_total: number | null
    streak_days: number | null
    rank: number | null
    percentile: number | null
    events_attended: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fan_id: string | null
    email: string | null
    name: string | null
    avatar_initials: string | null
    city: string | null
    member_since: Date | null
    created_at: Date | null
    updated_at: Date | null
    xp_total: number | null
    current_tier: $Enums.Tier | null
    streak_days: number | null
    rank: number | null
    percentile: number | null
    top_artist: string | null
    top_venue: string | null
    events_attended: number | null
    spotify_id: string | null
    apple_music_id: string | null
    discord_id: string | null
    lastfm_username: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fan_id: string | null
    email: string | null
    name: string | null
    avatar_initials: string | null
    city: string | null
    member_since: Date | null
    created_at: Date | null
    updated_at: Date | null
    xp_total: number | null
    current_tier: $Enums.Tier | null
    streak_days: number | null
    rank: number | null
    percentile: number | null
    top_artist: string | null
    top_venue: string | null
    events_attended: number | null
    spotify_id: string | null
    apple_music_id: string | null
    discord_id: string | null
    lastfm_username: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fan_id: number
    email: number
    name: number
    avatar_initials: number
    city: number
    member_since: number
    created_at: number
    updated_at: number
    xp_total: number
    current_tier: number
    streak_days: number
    rank: number
    percentile: number
    top_artist: number
    top_venue: number
    events_attended: number
    spotify_id: number
    apple_music_id: number
    discord_id: number
    lastfm_username: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    xp_total?: true
    streak_days?: true
    rank?: true
    percentile?: true
    events_attended?: true
  }

  export type UserSumAggregateInputType = {
    xp_total?: true
    streak_days?: true
    rank?: true
    percentile?: true
    events_attended?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fan_id?: true
    email?: true
    name?: true
    avatar_initials?: true
    city?: true
    member_since?: true
    created_at?: true
    updated_at?: true
    xp_total?: true
    current_tier?: true
    streak_days?: true
    rank?: true
    percentile?: true
    top_artist?: true
    top_venue?: true
    events_attended?: true
    spotify_id?: true
    apple_music_id?: true
    discord_id?: true
    lastfm_username?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fan_id?: true
    email?: true
    name?: true
    avatar_initials?: true
    city?: true
    member_since?: true
    created_at?: true
    updated_at?: true
    xp_total?: true
    current_tier?: true
    streak_days?: true
    rank?: true
    percentile?: true
    top_artist?: true
    top_venue?: true
    events_attended?: true
    spotify_id?: true
    apple_music_id?: true
    discord_id?: true
    lastfm_username?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fan_id?: true
    email?: true
    name?: true
    avatar_initials?: true
    city?: true
    member_since?: true
    created_at?: true
    updated_at?: true
    xp_total?: true
    current_tier?: true
    streak_days?: true
    rank?: true
    percentile?: true
    top_artist?: true
    top_venue?: true
    events_attended?: true
    spotify_id?: true
    apple_music_id?: true
    discord_id?: true
    lastfm_username?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fan_id: string
    email: string | null
    name: string
    avatar_initials: string
    city: string
    member_since: Date
    created_at: Date
    updated_at: Date
    xp_total: number
    current_tier: $Enums.Tier
    streak_days: number
    rank: number | null
    percentile: number | null
    top_artist: string | null
    top_venue: string | null
    events_attended: number
    spotify_id: string | null
    apple_music_id: string | null
    discord_id: string | null
    lastfm_username: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fan_id?: boolean
    email?: boolean
    name?: boolean
    avatar_initials?: boolean
    city?: boolean
    member_since?: boolean
    created_at?: boolean
    updated_at?: boolean
    xp_total?: boolean
    current_tier?: boolean
    streak_days?: boolean
    rank?: boolean
    percentile?: boolean
    top_artist?: boolean
    top_venue?: boolean
    events_attended?: boolean
    spotify_id?: boolean
    apple_music_id?: boolean
    discord_id?: boolean
    lastfm_username?: boolean
    event_interactions?: boolean | User$event_interactionsArgs<ExtArgs>
    challenge_progress?: boolean | User$challenge_progressArgs<ExtArgs>
    xp_transactions?: boolean | User$xp_transactionsArgs<ExtArgs>
    friend_activities?: boolean | User$friend_activitiesArgs<ExtArgs>
    recent_activities?: boolean | User$recent_activitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fan_id?: boolean
    email?: boolean
    name?: boolean
    avatar_initials?: boolean
    city?: boolean
    member_since?: boolean
    created_at?: boolean
    updated_at?: boolean
    xp_total?: boolean
    current_tier?: boolean
    streak_days?: boolean
    rank?: boolean
    percentile?: boolean
    top_artist?: boolean
    top_venue?: boolean
    events_attended?: boolean
    spotify_id?: boolean
    apple_music_id?: boolean
    discord_id?: boolean
    lastfm_username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fan_id?: boolean
    email?: boolean
    name?: boolean
    avatar_initials?: boolean
    city?: boolean
    member_since?: boolean
    created_at?: boolean
    updated_at?: boolean
    xp_total?: boolean
    current_tier?: boolean
    streak_days?: boolean
    rank?: boolean
    percentile?: boolean
    top_artist?: boolean
    top_venue?: boolean
    events_attended?: boolean
    spotify_id?: boolean
    apple_music_id?: boolean
    discord_id?: boolean
    lastfm_username?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fan_id?: boolean
    email?: boolean
    name?: boolean
    avatar_initials?: boolean
    city?: boolean
    member_since?: boolean
    created_at?: boolean
    updated_at?: boolean
    xp_total?: boolean
    current_tier?: boolean
    streak_days?: boolean
    rank?: boolean
    percentile?: boolean
    top_artist?: boolean
    top_venue?: boolean
    events_attended?: boolean
    spotify_id?: boolean
    apple_music_id?: boolean
    discord_id?: boolean
    lastfm_username?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fan_id" | "email" | "name" | "avatar_initials" | "city" | "member_since" | "created_at" | "updated_at" | "xp_total" | "current_tier" | "streak_days" | "rank" | "percentile" | "top_artist" | "top_venue" | "events_attended" | "spotify_id" | "apple_music_id" | "discord_id" | "lastfm_username", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event_interactions?: boolean | User$event_interactionsArgs<ExtArgs>
    challenge_progress?: boolean | User$challenge_progressArgs<ExtArgs>
    xp_transactions?: boolean | User$xp_transactionsArgs<ExtArgs>
    friend_activities?: boolean | User$friend_activitiesArgs<ExtArgs>
    recent_activities?: boolean | User$recent_activitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      event_interactions: Prisma.$UserEventPayload<ExtArgs>[]
      challenge_progress: Prisma.$UserChallengePayload<ExtArgs>[]
      xp_transactions: Prisma.$XpTransactionPayload<ExtArgs>[]
      friend_activities: Prisma.$FriendActivityPayload<ExtArgs>[]
      recent_activities: Prisma.$RecentActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fan_id: string
      email: string | null
      name: string
      avatar_initials: string
      city: string
      member_since: Date
      created_at: Date
      updated_at: Date
      xp_total: number
      current_tier: $Enums.Tier
      streak_days: number
      rank: number | null
      percentile: number | null
      top_artist: string | null
      top_venue: string | null
      events_attended: number
      spotify_id: string | null
      apple_music_id: string | null
      discord_id: string | null
      lastfm_username: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event_interactions<T extends User$event_interactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$event_interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    challenge_progress<T extends User$challenge_progressArgs<ExtArgs> = {}>(args?: Subset<T, User$challenge_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    xp_transactions<T extends User$xp_transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$xp_transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friend_activities<T extends User$friend_activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$friend_activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recent_activities<T extends User$recent_activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$recent_activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fan_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatar_initials: FieldRef<"User", 'String'>
    readonly city: FieldRef<"User", 'String'>
    readonly member_since: FieldRef<"User", 'DateTime'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly xp_total: FieldRef<"User", 'Int'>
    readonly current_tier: FieldRef<"User", 'Tier'>
    readonly streak_days: FieldRef<"User", 'Int'>
    readonly rank: FieldRef<"User", 'Int'>
    readonly percentile: FieldRef<"User", 'Int'>
    readonly top_artist: FieldRef<"User", 'String'>
    readonly top_venue: FieldRef<"User", 'String'>
    readonly events_attended: FieldRef<"User", 'Int'>
    readonly spotify_id: FieldRef<"User", 'String'>
    readonly apple_music_id: FieldRef<"User", 'String'>
    readonly discord_id: FieldRef<"User", 'String'>
    readonly lastfm_username: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.event_interactions
   */
  export type User$event_interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * User.challenge_progress
   */
  export type User$challenge_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    where?: UserChallengeWhereInput
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    cursor?: UserChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserChallengeScalarFieldEnum | UserChallengeScalarFieldEnum[]
  }

  /**
   * User.xp_transactions
   */
  export type User$xp_transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    where?: XpTransactionWhereInput
    orderBy?: XpTransactionOrderByWithRelationInput | XpTransactionOrderByWithRelationInput[]
    cursor?: XpTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: XpTransactionScalarFieldEnum | XpTransactionScalarFieldEnum[]
  }

  /**
   * User.friend_activities
   */
  export type User$friend_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    where?: FriendActivityWhereInput
    orderBy?: FriendActivityOrderByWithRelationInput | FriendActivityOrderByWithRelationInput[]
    cursor?: FriendActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendActivityScalarFieldEnum | FriendActivityScalarFieldEnum[]
  }

  /**
   * User.recent_activities
   */
  export type User$recent_activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    where?: RecentActivityWhereInput
    orderBy?: RecentActivityOrderByWithRelationInput | RecentActivityOrderByWithRelationInput[]
    cursor?: RecentActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecentActivityScalarFieldEnum | RecentActivityScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    event_id: string | null
    title: string | null
    subtitle: string | null
    artist: string | null
    venue: string | null
    city: string | null
    date: Date | null
    category: $Enums.EventCategory | null
    image_url: string | null
    status: string | null
    trending: boolean | null
    featured: boolean | null
    created_at: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    event_id: string | null
    title: string | null
    subtitle: string | null
    artist: string | null
    venue: string | null
    city: string | null
    date: Date | null
    category: $Enums.EventCategory | null
    image_url: string | null
    status: string | null
    trending: boolean | null
    featured: boolean | null
    created_at: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    event_id: number
    title: number
    subtitle: number
    artist: number
    venue: number
    city: number
    date: number
    category: number
    image_url: number
    status: number
    trending: number
    featured: number
    created_at: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    event_id?: true
    title?: true
    subtitle?: true
    artist?: true
    venue?: true
    city?: true
    date?: true
    category?: true
    image_url?: true
    status?: true
    trending?: true
    featured?: true
    created_at?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    event_id?: true
    title?: true
    subtitle?: true
    artist?: true
    venue?: true
    city?: true
    date?: true
    category?: true
    image_url?: true
    status?: true
    trending?: true
    featured?: true
    created_at?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    event_id?: true
    title?: true
    subtitle?: true
    artist?: true
    venue?: true
    city?: true
    date?: true
    category?: true
    image_url?: true
    status?: true
    trending?: true
    featured?: true
    created_at?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    event_id: string
    title: string
    subtitle: string | null
    artist: string | null
    venue: string
    city: string
    date: Date
    category: $Enums.EventCategory
    image_url: string | null
    status: string | null
    trending: boolean
    featured: boolean
    created_at: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    title?: boolean
    subtitle?: boolean
    artist?: boolean
    venue?: boolean
    city?: boolean
    date?: boolean
    category?: boolean
    image_url?: boolean
    status?: boolean
    trending?: boolean
    featured?: boolean
    created_at?: boolean
    user_events?: boolean | Event$user_eventsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    title?: boolean
    subtitle?: boolean
    artist?: boolean
    venue?: boolean
    city?: boolean
    date?: boolean
    category?: boolean
    image_url?: boolean
    status?: boolean
    trending?: boolean
    featured?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_id?: boolean
    title?: boolean
    subtitle?: boolean
    artist?: boolean
    venue?: boolean
    city?: boolean
    date?: boolean
    category?: boolean
    image_url?: boolean
    status?: boolean
    trending?: boolean
    featured?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    event_id?: boolean
    title?: boolean
    subtitle?: boolean
    artist?: boolean
    venue?: boolean
    city?: boolean
    date?: boolean
    category?: boolean
    image_url?: boolean
    status?: boolean
    trending?: boolean
    featured?: boolean
    created_at?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "event_id" | "title" | "subtitle" | "artist" | "venue" | "city" | "date" | "category" | "image_url" | "status" | "trending" | "featured" | "created_at", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_events?: boolean | Event$user_eventsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      user_events: Prisma.$UserEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      event_id: string
      title: string
      subtitle: string | null
      artist: string | null
      venue: string
      city: string
      date: Date
      category: $Enums.EventCategory
      image_url: string | null
      status: string | null
      trending: boolean
      featured: boolean
      created_at: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_events<T extends Event$user_eventsArgs<ExtArgs> = {}>(args?: Subset<T, Event$user_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly event_id: FieldRef<"Event", 'String'>
    readonly title: FieldRef<"Event", 'String'>
    readonly subtitle: FieldRef<"Event", 'String'>
    readonly artist: FieldRef<"Event", 'String'>
    readonly venue: FieldRef<"Event", 'String'>
    readonly city: FieldRef<"Event", 'String'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly category: FieldRef<"Event", 'EventCategory'>
    readonly image_url: FieldRef<"Event", 'String'>
    readonly status: FieldRef<"Event", 'String'>
    readonly trending: FieldRef<"Event", 'Boolean'>
    readonly featured: FieldRef<"Event", 'Boolean'>
    readonly created_at: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.user_events
   */
  export type Event$user_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    cursor?: UserEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model UserEvent
   */

  export type AggregateUserEvent = {
    _count: UserEventCountAggregateOutputType | null
    _min: UserEventMinAggregateOutputType | null
    _max: UserEventMaxAggregateOutputType | null
  }

  export type UserEventMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_id: string | null
    bookmarked: boolean | null
    notify_me: boolean | null
    attended: boolean | null
    created_at: Date | null
  }

  export type UserEventMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    event_id: string | null
    bookmarked: boolean | null
    notify_me: boolean | null
    attended: boolean | null
    created_at: Date | null
  }

  export type UserEventCountAggregateOutputType = {
    id: number
    user_id: number
    event_id: number
    bookmarked: number
    notify_me: number
    attended: number
    created_at: number
    _all: number
  }


  export type UserEventMinAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    bookmarked?: true
    notify_me?: true
    attended?: true
    created_at?: true
  }

  export type UserEventMaxAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    bookmarked?: true
    notify_me?: true
    attended?: true
    created_at?: true
  }

  export type UserEventCountAggregateInputType = {
    id?: true
    user_id?: true
    event_id?: true
    bookmarked?: true
    notify_me?: true
    attended?: true
    created_at?: true
    _all?: true
  }

  export type UserEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEvent to aggregate.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserEvents
    **/
    _count?: true | UserEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserEventMaxAggregateInputType
  }

  export type GetUserEventAggregateType<T extends UserEventAggregateArgs> = {
        [P in keyof T & keyof AggregateUserEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserEvent[P]>
      : GetScalarType<T[P], AggregateUserEvent[P]>
  }




  export type UserEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEventWhereInput
    orderBy?: UserEventOrderByWithAggregationInput | UserEventOrderByWithAggregationInput[]
    by: UserEventScalarFieldEnum[] | UserEventScalarFieldEnum
    having?: UserEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserEventCountAggregateInputType | true
    _min?: UserEventMinAggregateInputType
    _max?: UserEventMaxAggregateInputType
  }

  export type UserEventGroupByOutputType = {
    id: string
    user_id: string
    event_id: string
    bookmarked: boolean
    notify_me: boolean
    attended: boolean
    created_at: Date
    _count: UserEventCountAggregateOutputType | null
    _min: UserEventMinAggregateOutputType | null
    _max: UserEventMaxAggregateOutputType | null
  }

  type GetUserEventGroupByPayload<T extends UserEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserEventGroupByOutputType[P]>
            : GetScalarType<T[P], UserEventGroupByOutputType[P]>
        }
      >
    >


  export type UserEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEvent"]>

  export type UserEventSelectScalar = {
    id?: boolean
    user_id?: boolean
    event_id?: boolean
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: boolean
  }

  export type UserEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "event_id" | "bookmarked" | "notify_me" | "attended" | "created_at", ExtArgs["result"]["userEvent"]>
  export type UserEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type UserEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type UserEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $UserEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserEvent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      event_id: string
      bookmarked: boolean
      notify_me: boolean
      attended: boolean
      created_at: Date
    }, ExtArgs["result"]["userEvent"]>
    composites: {}
  }

  type UserEventGetPayload<S extends boolean | null | undefined | UserEventDefaultArgs> = $Result.GetResult<Prisma.$UserEventPayload, S>

  type UserEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserEventCountAggregateInputType | true
    }

  export interface UserEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserEvent'], meta: { name: 'UserEvent' } }
    /**
     * Find zero or one UserEvent that matches the filter.
     * @param {UserEventFindUniqueArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserEventFindUniqueArgs>(args: SelectSubset<T, UserEventFindUniqueArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserEventFindUniqueOrThrowArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserEventFindUniqueOrThrowArgs>(args: SelectSubset<T, UserEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindFirstArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserEventFindFirstArgs>(args?: SelectSubset<T, UserEventFindFirstArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindFirstOrThrowArgs} args - Arguments to find a UserEvent
     * @example
     * // Get one UserEvent
     * const userEvent = await prisma.userEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserEventFindFirstOrThrowArgs>(args?: SelectSubset<T, UserEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserEvents
     * const userEvents = await prisma.userEvent.findMany()
     * 
     * // Get first 10 UserEvents
     * const userEvents = await prisma.userEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userEventWithIdOnly = await prisma.userEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserEventFindManyArgs>(args?: SelectSubset<T, UserEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserEvent.
     * @param {UserEventCreateArgs} args - Arguments to create a UserEvent.
     * @example
     * // Create one UserEvent
     * const UserEvent = await prisma.userEvent.create({
     *   data: {
     *     // ... data to create a UserEvent
     *   }
     * })
     * 
     */
    create<T extends UserEventCreateArgs>(args: SelectSubset<T, UserEventCreateArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserEvents.
     * @param {UserEventCreateManyArgs} args - Arguments to create many UserEvents.
     * @example
     * // Create many UserEvents
     * const userEvent = await prisma.userEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserEventCreateManyArgs>(args?: SelectSubset<T, UserEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserEvents and returns the data saved in the database.
     * @param {UserEventCreateManyAndReturnArgs} args - Arguments to create many UserEvents.
     * @example
     * // Create many UserEvents
     * const userEvent = await prisma.userEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserEvents and only return the `id`
     * const userEventWithIdOnly = await prisma.userEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserEventCreateManyAndReturnArgs>(args?: SelectSubset<T, UserEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserEvent.
     * @param {UserEventDeleteArgs} args - Arguments to delete one UserEvent.
     * @example
     * // Delete one UserEvent
     * const UserEvent = await prisma.userEvent.delete({
     *   where: {
     *     // ... filter to delete one UserEvent
     *   }
     * })
     * 
     */
    delete<T extends UserEventDeleteArgs>(args: SelectSubset<T, UserEventDeleteArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserEvent.
     * @param {UserEventUpdateArgs} args - Arguments to update one UserEvent.
     * @example
     * // Update one UserEvent
     * const userEvent = await prisma.userEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserEventUpdateArgs>(args: SelectSubset<T, UserEventUpdateArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserEvents.
     * @param {UserEventDeleteManyArgs} args - Arguments to filter UserEvents to delete.
     * @example
     * // Delete a few UserEvents
     * const { count } = await prisma.userEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserEventDeleteManyArgs>(args?: SelectSubset<T, UserEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserEvents
     * const userEvent = await prisma.userEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserEventUpdateManyArgs>(args: SelectSubset<T, UserEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEvents and returns the data updated in the database.
     * @param {UserEventUpdateManyAndReturnArgs} args - Arguments to update many UserEvents.
     * @example
     * // Update many UserEvents
     * const userEvent = await prisma.userEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserEvents and only return the `id`
     * const userEventWithIdOnly = await prisma.userEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserEventUpdateManyAndReturnArgs>(args: SelectSubset<T, UserEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserEvent.
     * @param {UserEventUpsertArgs} args - Arguments to update or create a UserEvent.
     * @example
     * // Update or create a UserEvent
     * const userEvent = await prisma.userEvent.upsert({
     *   create: {
     *     // ... data to create a UserEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserEvent we want to update
     *   }
     * })
     */
    upsert<T extends UserEventUpsertArgs>(args: SelectSubset<T, UserEventUpsertArgs<ExtArgs>>): Prisma__UserEventClient<$Result.GetResult<Prisma.$UserEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventCountArgs} args - Arguments to filter UserEvents to count.
     * @example
     * // Count the number of UserEvents
     * const count = await prisma.userEvent.count({
     *   where: {
     *     // ... the filter for the UserEvents we want to count
     *   }
     * })
    **/
    count<T extends UserEventCountArgs>(
      args?: Subset<T, UserEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserEventAggregateArgs>(args: Subset<T, UserEventAggregateArgs>): Prisma.PrismaPromise<GetUserEventAggregateType<T>>

    /**
     * Group by UserEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserEventGroupByArgs['orderBy'] }
        : { orderBy?: UserEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserEvent model
   */
  readonly fields: UserEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserEvent model
   */
  interface UserEventFieldRefs {
    readonly id: FieldRef<"UserEvent", 'String'>
    readonly user_id: FieldRef<"UserEvent", 'String'>
    readonly event_id: FieldRef<"UserEvent", 'String'>
    readonly bookmarked: FieldRef<"UserEvent", 'Boolean'>
    readonly notify_me: FieldRef<"UserEvent", 'Boolean'>
    readonly attended: FieldRef<"UserEvent", 'Boolean'>
    readonly created_at: FieldRef<"UserEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserEvent findUnique
   */
  export type UserEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent findUniqueOrThrow
   */
  export type UserEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent findFirst
   */
  export type UserEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEvents.
     */
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent findFirstOrThrow
   */
  export type UserEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvent to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEvents.
     */
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent findMany
   */
  export type UserEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter, which UserEvents to fetch.
     */
    where?: UserEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEvents to fetch.
     */
    orderBy?: UserEventOrderByWithRelationInput | UserEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserEvents.
     */
    cursor?: UserEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEvents.
     */
    distinct?: UserEventScalarFieldEnum | UserEventScalarFieldEnum[]
  }

  /**
   * UserEvent create
   */
  export type UserEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The data needed to create a UserEvent.
     */
    data: XOR<UserEventCreateInput, UserEventUncheckedCreateInput>
  }

  /**
   * UserEvent createMany
   */
  export type UserEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserEvents.
     */
    data: UserEventCreateManyInput | UserEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserEvent createManyAndReturn
   */
  export type UserEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * The data used to create many UserEvents.
     */
    data: UserEventCreateManyInput | UserEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEvent update
   */
  export type UserEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The data needed to update a UserEvent.
     */
    data: XOR<UserEventUpdateInput, UserEventUncheckedUpdateInput>
    /**
     * Choose, which UserEvent to update.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent updateMany
   */
  export type UserEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserEvents.
     */
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyInput>
    /**
     * Filter which UserEvents to update
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to update.
     */
    limit?: number
  }

  /**
   * UserEvent updateManyAndReturn
   */
  export type UserEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * The data used to update UserEvents.
     */
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyInput>
    /**
     * Filter which UserEvents to update
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserEvent upsert
   */
  export type UserEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * The filter to search for the UserEvent to update in case it exists.
     */
    where: UserEventWhereUniqueInput
    /**
     * In case the UserEvent found by the `where` argument doesn't exist, create a new UserEvent with this data.
     */
    create: XOR<UserEventCreateInput, UserEventUncheckedCreateInput>
    /**
     * In case the UserEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserEventUpdateInput, UserEventUncheckedUpdateInput>
  }

  /**
   * UserEvent delete
   */
  export type UserEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
    /**
     * Filter which UserEvent to delete.
     */
    where: UserEventWhereUniqueInput
  }

  /**
   * UserEvent deleteMany
   */
  export type UserEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEvents to delete
     */
    where?: UserEventWhereInput
    /**
     * Limit how many UserEvents to delete.
     */
    limit?: number
  }

  /**
   * UserEvent without action
   */
  export type UserEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEvent
     */
    select?: UserEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserEvent
     */
    omit?: UserEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserEventInclude<ExtArgs> | null
  }


  /**
   * Model Challenge
   */

  export type AggregateChallenge = {
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  export type ChallengeAvgAggregateOutputType = {
    xp_reward: number | null
    progress_target: number | null
  }

  export type ChallengeSumAggregateOutputType = {
    xp_reward: number | null
    progress_target: number | null
  }

  export type ChallengeMinAggregateOutputType = {
    id: string | null
    challenge_id: string | null
    title: string | null
    description: string | null
    category: string | null
    xp_reward: number | null
    difficulty: string | null
    progress_target: number | null
    active: boolean | null
    created_at: Date | null
  }

  export type ChallengeMaxAggregateOutputType = {
    id: string | null
    challenge_id: string | null
    title: string | null
    description: string | null
    category: string | null
    xp_reward: number | null
    difficulty: string | null
    progress_target: number | null
    active: boolean | null
    created_at: Date | null
  }

  export type ChallengeCountAggregateOutputType = {
    id: number
    challenge_id: number
    title: number
    description: number
    category: number
    xp_reward: number
    difficulty: number
    tasks: number
    progress_target: number
    active: number
    created_at: number
    _all: number
  }


  export type ChallengeAvgAggregateInputType = {
    xp_reward?: true
    progress_target?: true
  }

  export type ChallengeSumAggregateInputType = {
    xp_reward?: true
    progress_target?: true
  }

  export type ChallengeMinAggregateInputType = {
    id?: true
    challenge_id?: true
    title?: true
    description?: true
    category?: true
    xp_reward?: true
    difficulty?: true
    progress_target?: true
    active?: true
    created_at?: true
  }

  export type ChallengeMaxAggregateInputType = {
    id?: true
    challenge_id?: true
    title?: true
    description?: true
    category?: true
    xp_reward?: true
    difficulty?: true
    progress_target?: true
    active?: true
    created_at?: true
  }

  export type ChallengeCountAggregateInputType = {
    id?: true
    challenge_id?: true
    title?: true
    description?: true
    category?: true
    xp_reward?: true
    difficulty?: true
    tasks?: true
    progress_target?: true
    active?: true
    created_at?: true
    _all?: true
  }

  export type ChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenge to aggregate.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Challenges
    **/
    _count?: true | ChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeMaxAggregateInputType
  }

  export type GetChallengeAggregateType<T extends ChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChallenge[P]>
      : GetScalarType<T[P], AggregateChallenge[P]>
  }




  export type ChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChallengeWhereInput
    orderBy?: ChallengeOrderByWithAggregationInput | ChallengeOrderByWithAggregationInput[]
    by: ChallengeScalarFieldEnum[] | ChallengeScalarFieldEnum
    having?: ChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChallengeCountAggregateInputType | true
    _avg?: ChallengeAvgAggregateInputType
    _sum?: ChallengeSumAggregateInputType
    _min?: ChallengeMinAggregateInputType
    _max?: ChallengeMaxAggregateInputType
  }

  export type ChallengeGroupByOutputType = {
    id: string
    challenge_id: string
    title: string
    description: string | null
    category: string
    xp_reward: number
    difficulty: string
    tasks: JsonValue
    progress_target: number
    active: boolean
    created_at: Date
    _count: ChallengeCountAggregateOutputType | null
    _avg: ChallengeAvgAggregateOutputType | null
    _sum: ChallengeSumAggregateOutputType | null
    _min: ChallengeMinAggregateOutputType | null
    _max: ChallengeMaxAggregateOutputType | null
  }

  type GetChallengeGroupByPayload<T extends ChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], ChallengeGroupByOutputType[P]>
        }
      >
    >


  export type ChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challenge_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    xp_reward?: boolean
    difficulty?: boolean
    tasks?: boolean
    progress_target?: boolean
    active?: boolean
    created_at?: boolean
    user_challenges?: boolean | Challenge$user_challengesArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challenge_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    xp_reward?: boolean
    difficulty?: boolean
    tasks?: boolean
    progress_target?: boolean
    active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    challenge_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    xp_reward?: boolean
    difficulty?: boolean
    tasks?: boolean
    progress_target?: boolean
    active?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["challenge"]>

  export type ChallengeSelectScalar = {
    id?: boolean
    challenge_id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    xp_reward?: boolean
    difficulty?: boolean
    tasks?: boolean
    progress_target?: boolean
    active?: boolean
    created_at?: boolean
  }

  export type ChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "challenge_id" | "title" | "description" | "category" | "xp_reward" | "difficulty" | "tasks" | "progress_target" | "active" | "created_at", ExtArgs["result"]["challenge"]>
  export type ChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_challenges?: boolean | Challenge$user_challengesArgs<ExtArgs>
    _count?: boolean | ChallengeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Challenge"
    objects: {
      user_challenges: Prisma.$UserChallengePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      challenge_id: string
      title: string
      description: string | null
      category: string
      xp_reward: number
      difficulty: string
      tasks: Prisma.JsonValue
      progress_target: number
      active: boolean
      created_at: Date
    }, ExtArgs["result"]["challenge"]>
    composites: {}
  }

  type ChallengeGetPayload<S extends boolean | null | undefined | ChallengeDefaultArgs> = $Result.GetResult<Prisma.$ChallengePayload, S>

  type ChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChallengeCountAggregateInputType | true
    }

  export interface ChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Challenge'], meta: { name: 'Challenge' } }
    /**
     * Find zero or one Challenge that matches the filter.
     * @param {ChallengeFindUniqueArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeFindUniqueArgs>(args: SelectSubset<T, ChallengeFindUniqueArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Challenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeFindUniqueOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, ChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeFindFirstArgs>(args?: SelectSubset<T, ChallengeFindFirstArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Challenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindFirstOrThrowArgs} args - Arguments to find a Challenge
     * @example
     * // Get one Challenge
     * const challenge = await prisma.challenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, ChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Challenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Challenges
     * const challenges = await prisma.challenge.findMany()
     * 
     * // Get first 10 Challenges
     * const challenges = await prisma.challenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const challengeWithIdOnly = await prisma.challenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChallengeFindManyArgs>(args?: SelectSubset<T, ChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Challenge.
     * @param {ChallengeCreateArgs} args - Arguments to create a Challenge.
     * @example
     * // Create one Challenge
     * const Challenge = await prisma.challenge.create({
     *   data: {
     *     // ... data to create a Challenge
     *   }
     * })
     * 
     */
    create<T extends ChallengeCreateArgs>(args: SelectSubset<T, ChallengeCreateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Challenges.
     * @param {ChallengeCreateManyArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChallengeCreateManyArgs>(args?: SelectSubset<T, ChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Challenges and returns the data saved in the database.
     * @param {ChallengeCreateManyAndReturnArgs} args - Arguments to create many Challenges.
     * @example
     * // Create many Challenges
     * const challenge = await prisma.challenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, ChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Challenge.
     * @param {ChallengeDeleteArgs} args - Arguments to delete one Challenge.
     * @example
     * // Delete one Challenge
     * const Challenge = await prisma.challenge.delete({
     *   where: {
     *     // ... filter to delete one Challenge
     *   }
     * })
     * 
     */
    delete<T extends ChallengeDeleteArgs>(args: SelectSubset<T, ChallengeDeleteArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Challenge.
     * @param {ChallengeUpdateArgs} args - Arguments to update one Challenge.
     * @example
     * // Update one Challenge
     * const challenge = await prisma.challenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChallengeUpdateArgs>(args: SelectSubset<T, ChallengeUpdateArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Challenges.
     * @param {ChallengeDeleteManyArgs} args - Arguments to filter Challenges to delete.
     * @example
     * // Delete a few Challenges
     * const { count } = await prisma.challenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChallengeDeleteManyArgs>(args?: SelectSubset<T, ChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChallengeUpdateManyArgs>(args: SelectSubset<T, ChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Challenges and returns the data updated in the database.
     * @param {ChallengeUpdateManyAndReturnArgs} args - Arguments to update many Challenges.
     * @example
     * // Update many Challenges
     * const challenge = await prisma.challenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Challenges and only return the `id`
     * const challengeWithIdOnly = await prisma.challenge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, ChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Challenge.
     * @param {ChallengeUpsertArgs} args - Arguments to update or create a Challenge.
     * @example
     * // Update or create a Challenge
     * const challenge = await prisma.challenge.upsert({
     *   create: {
     *     // ... data to create a Challenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Challenge we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeUpsertArgs>(args: SelectSubset<T, ChallengeUpsertArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Challenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeCountArgs} args - Arguments to filter Challenges to count.
     * @example
     * // Count the number of Challenges
     * const count = await prisma.challenge.count({
     *   where: {
     *     // ... the filter for the Challenges we want to count
     *   }
     * })
    **/
    count<T extends ChallengeCountArgs>(
      args?: Subset<T, ChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChallengeAggregateArgs>(args: Subset<T, ChallengeAggregateArgs>): Prisma.PrismaPromise<GetChallengeAggregateType<T>>

    /**
     * Group by Challenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChallengeGroupByArgs['orderBy'] }
        : { orderBy?: ChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Challenge model
   */
  readonly fields: ChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Challenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_challenges<T extends Challenge$user_challengesArgs<ExtArgs> = {}>(args?: Subset<T, Challenge$user_challengesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Challenge model
   */
  interface ChallengeFieldRefs {
    readonly id: FieldRef<"Challenge", 'String'>
    readonly challenge_id: FieldRef<"Challenge", 'String'>
    readonly title: FieldRef<"Challenge", 'String'>
    readonly description: FieldRef<"Challenge", 'String'>
    readonly category: FieldRef<"Challenge", 'String'>
    readonly xp_reward: FieldRef<"Challenge", 'Int'>
    readonly difficulty: FieldRef<"Challenge", 'String'>
    readonly tasks: FieldRef<"Challenge", 'Json'>
    readonly progress_target: FieldRef<"Challenge", 'Int'>
    readonly active: FieldRef<"Challenge", 'Boolean'>
    readonly created_at: FieldRef<"Challenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Challenge findUnique
   */
  export type ChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findUniqueOrThrow
   */
  export type ChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge findFirst
   */
  export type ChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findFirstOrThrow
   */
  export type ChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenge to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge findMany
   */
  export type ChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter, which Challenges to fetch.
     */
    where?: ChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Challenges to fetch.
     */
    orderBy?: ChallengeOrderByWithRelationInput | ChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Challenges.
     */
    cursor?: ChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Challenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Challenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Challenges.
     */
    distinct?: ChallengeScalarFieldEnum | ChallengeScalarFieldEnum[]
  }

  /**
   * Challenge create
   */
  export type ChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a Challenge.
     */
    data: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
  }

  /**
   * Challenge createMany
   */
  export type ChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge createManyAndReturn
   */
  export type ChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many Challenges.
     */
    data: ChallengeCreateManyInput | ChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Challenge update
   */
  export type ChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a Challenge.
     */
    data: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
    /**
     * Choose, which Challenge to update.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge updateMany
   */
  export type ChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
  }

  /**
   * Challenge updateManyAndReturn
   */
  export type ChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * The data used to update Challenges.
     */
    data: XOR<ChallengeUpdateManyMutationInput, ChallengeUncheckedUpdateManyInput>
    /**
     * Filter which Challenges to update
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to update.
     */
    limit?: number
  }

  /**
   * Challenge upsert
   */
  export type ChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the Challenge to update in case it exists.
     */
    where: ChallengeWhereUniqueInput
    /**
     * In case the Challenge found by the `where` argument doesn't exist, create a new Challenge with this data.
     */
    create: XOR<ChallengeCreateInput, ChallengeUncheckedCreateInput>
    /**
     * In case the Challenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChallengeUpdateInput, ChallengeUncheckedUpdateInput>
  }

  /**
   * Challenge delete
   */
  export type ChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
    /**
     * Filter which Challenge to delete.
     */
    where: ChallengeWhereUniqueInput
  }

  /**
   * Challenge deleteMany
   */
  export type ChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Challenges to delete
     */
    where?: ChallengeWhereInput
    /**
     * Limit how many Challenges to delete.
     */
    limit?: number
  }

  /**
   * Challenge.user_challenges
   */
  export type Challenge$user_challengesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    where?: UserChallengeWhereInput
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    cursor?: UserChallengeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserChallengeScalarFieldEnum | UserChallengeScalarFieldEnum[]
  }

  /**
   * Challenge without action
   */
  export type ChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: ChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Challenge
     */
    omit?: ChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChallengeInclude<ExtArgs> | null
  }


  /**
   * Model UserChallenge
   */

  export type AggregateUserChallenge = {
    _count: UserChallengeCountAggregateOutputType | null
    _avg: UserChallengeAvgAggregateOutputType | null
    _sum: UserChallengeSumAggregateOutputType | null
    _min: UserChallengeMinAggregateOutputType | null
    _max: UserChallengeMaxAggregateOutputType | null
  }

  export type UserChallengeAvgAggregateOutputType = {
    progress: number | null
  }

  export type UserChallengeSumAggregateOutputType = {
    progress: number | null
  }

  export type UserChallengeMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    challenge_id: string | null
    completed: boolean | null
    progress: number | null
    completed_at: Date | null
    created_at: Date | null
  }

  export type UserChallengeMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    challenge_id: string | null
    completed: boolean | null
    progress: number | null
    completed_at: Date | null
    created_at: Date | null
  }

  export type UserChallengeCountAggregateOutputType = {
    id: number
    user_id: number
    challenge_id: number
    completed: number
    progress: number
    tasks_completed: number
    completed_at: number
    created_at: number
    _all: number
  }


  export type UserChallengeAvgAggregateInputType = {
    progress?: true
  }

  export type UserChallengeSumAggregateInputType = {
    progress?: true
  }

  export type UserChallengeMinAggregateInputType = {
    id?: true
    user_id?: true
    challenge_id?: true
    completed?: true
    progress?: true
    completed_at?: true
    created_at?: true
  }

  export type UserChallengeMaxAggregateInputType = {
    id?: true
    user_id?: true
    challenge_id?: true
    completed?: true
    progress?: true
    completed_at?: true
    created_at?: true
  }

  export type UserChallengeCountAggregateInputType = {
    id?: true
    user_id?: true
    challenge_id?: true
    completed?: true
    progress?: true
    tasks_completed?: true
    completed_at?: true
    created_at?: true
    _all?: true
  }

  export type UserChallengeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserChallenge to aggregate.
     */
    where?: UserChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserChallenges to fetch.
     */
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserChallenges
    **/
    _count?: true | UserChallengeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserChallengeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserChallengeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserChallengeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserChallengeMaxAggregateInputType
  }

  export type GetUserChallengeAggregateType<T extends UserChallengeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserChallenge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserChallenge[P]>
      : GetScalarType<T[P], AggregateUserChallenge[P]>
  }




  export type UserChallengeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserChallengeWhereInput
    orderBy?: UserChallengeOrderByWithAggregationInput | UserChallengeOrderByWithAggregationInput[]
    by: UserChallengeScalarFieldEnum[] | UserChallengeScalarFieldEnum
    having?: UserChallengeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserChallengeCountAggregateInputType | true
    _avg?: UserChallengeAvgAggregateInputType
    _sum?: UserChallengeSumAggregateInputType
    _min?: UserChallengeMinAggregateInputType
    _max?: UserChallengeMaxAggregateInputType
  }

  export type UserChallengeGroupByOutputType = {
    id: string
    user_id: string
    challenge_id: string
    completed: boolean
    progress: number
    tasks_completed: JsonValue
    completed_at: Date | null
    created_at: Date
    _count: UserChallengeCountAggregateOutputType | null
    _avg: UserChallengeAvgAggregateOutputType | null
    _sum: UserChallengeSumAggregateOutputType | null
    _min: UserChallengeMinAggregateOutputType | null
    _max: UserChallengeMaxAggregateOutputType | null
  }

  type GetUserChallengeGroupByPayload<T extends UserChallengeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserChallengeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserChallengeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserChallengeGroupByOutputType[P]>
            : GetScalarType<T[P], UserChallengeGroupByOutputType[P]>
        }
      >
    >


  export type UserChallengeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    challenge_id?: boolean
    completed?: boolean
    progress?: boolean
    tasks_completed?: boolean
    completed_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userChallenge"]>

  export type UserChallengeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    challenge_id?: boolean
    completed?: boolean
    progress?: boolean
    tasks_completed?: boolean
    completed_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userChallenge"]>

  export type UserChallengeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    challenge_id?: boolean
    completed?: boolean
    progress?: boolean
    tasks_completed?: boolean
    completed_at?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userChallenge"]>

  export type UserChallengeSelectScalar = {
    id?: boolean
    user_id?: boolean
    challenge_id?: boolean
    completed?: boolean
    progress?: boolean
    tasks_completed?: boolean
    completed_at?: boolean
    created_at?: boolean
  }

  export type UserChallengeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "challenge_id" | "completed" | "progress" | "tasks_completed" | "completed_at" | "created_at", ExtArgs["result"]["userChallenge"]>
  export type UserChallengeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }
  export type UserChallengeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }
  export type UserChallengeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    challenge?: boolean | ChallengeDefaultArgs<ExtArgs>
  }

  export type $UserChallengePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserChallenge"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      challenge: Prisma.$ChallengePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      challenge_id: string
      completed: boolean
      progress: number
      tasks_completed: Prisma.JsonValue
      completed_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["userChallenge"]>
    composites: {}
  }

  type UserChallengeGetPayload<S extends boolean | null | undefined | UserChallengeDefaultArgs> = $Result.GetResult<Prisma.$UserChallengePayload, S>

  type UserChallengeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserChallengeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserChallengeCountAggregateInputType | true
    }

  export interface UserChallengeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserChallenge'], meta: { name: 'UserChallenge' } }
    /**
     * Find zero or one UserChallenge that matches the filter.
     * @param {UserChallengeFindUniqueArgs} args - Arguments to find a UserChallenge
     * @example
     * // Get one UserChallenge
     * const userChallenge = await prisma.userChallenge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserChallengeFindUniqueArgs>(args: SelectSubset<T, UserChallengeFindUniqueArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserChallenge that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserChallengeFindUniqueOrThrowArgs} args - Arguments to find a UserChallenge
     * @example
     * // Get one UserChallenge
     * const userChallenge = await prisma.userChallenge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserChallengeFindUniqueOrThrowArgs>(args: SelectSubset<T, UserChallengeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserChallenge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeFindFirstArgs} args - Arguments to find a UserChallenge
     * @example
     * // Get one UserChallenge
     * const userChallenge = await prisma.userChallenge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserChallengeFindFirstArgs>(args?: SelectSubset<T, UserChallengeFindFirstArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserChallenge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeFindFirstOrThrowArgs} args - Arguments to find a UserChallenge
     * @example
     * // Get one UserChallenge
     * const userChallenge = await prisma.userChallenge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserChallengeFindFirstOrThrowArgs>(args?: SelectSubset<T, UserChallengeFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserChallenges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserChallenges
     * const userChallenges = await prisma.userChallenge.findMany()
     * 
     * // Get first 10 UserChallenges
     * const userChallenges = await prisma.userChallenge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userChallengeWithIdOnly = await prisma.userChallenge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserChallengeFindManyArgs>(args?: SelectSubset<T, UserChallengeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserChallenge.
     * @param {UserChallengeCreateArgs} args - Arguments to create a UserChallenge.
     * @example
     * // Create one UserChallenge
     * const UserChallenge = await prisma.userChallenge.create({
     *   data: {
     *     // ... data to create a UserChallenge
     *   }
     * })
     * 
     */
    create<T extends UserChallengeCreateArgs>(args: SelectSubset<T, UserChallengeCreateArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserChallenges.
     * @param {UserChallengeCreateManyArgs} args - Arguments to create many UserChallenges.
     * @example
     * // Create many UserChallenges
     * const userChallenge = await prisma.userChallenge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserChallengeCreateManyArgs>(args?: SelectSubset<T, UserChallengeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserChallenges and returns the data saved in the database.
     * @param {UserChallengeCreateManyAndReturnArgs} args - Arguments to create many UserChallenges.
     * @example
     * // Create many UserChallenges
     * const userChallenge = await prisma.userChallenge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserChallenges and only return the `id`
     * const userChallengeWithIdOnly = await prisma.userChallenge.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserChallengeCreateManyAndReturnArgs>(args?: SelectSubset<T, UserChallengeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserChallenge.
     * @param {UserChallengeDeleteArgs} args - Arguments to delete one UserChallenge.
     * @example
     * // Delete one UserChallenge
     * const UserChallenge = await prisma.userChallenge.delete({
     *   where: {
     *     // ... filter to delete one UserChallenge
     *   }
     * })
     * 
     */
    delete<T extends UserChallengeDeleteArgs>(args: SelectSubset<T, UserChallengeDeleteArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserChallenge.
     * @param {UserChallengeUpdateArgs} args - Arguments to update one UserChallenge.
     * @example
     * // Update one UserChallenge
     * const userChallenge = await prisma.userChallenge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserChallengeUpdateArgs>(args: SelectSubset<T, UserChallengeUpdateArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserChallenges.
     * @param {UserChallengeDeleteManyArgs} args - Arguments to filter UserChallenges to delete.
     * @example
     * // Delete a few UserChallenges
     * const { count } = await prisma.userChallenge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserChallengeDeleteManyArgs>(args?: SelectSubset<T, UserChallengeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserChallenges
     * const userChallenge = await prisma.userChallenge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserChallengeUpdateManyArgs>(args: SelectSubset<T, UserChallengeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserChallenges and returns the data updated in the database.
     * @param {UserChallengeUpdateManyAndReturnArgs} args - Arguments to update many UserChallenges.
     * @example
     * // Update many UserChallenges
     * const userChallenge = await prisma.userChallenge.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserChallenges and only return the `id`
     * const userChallengeWithIdOnly = await prisma.userChallenge.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserChallengeUpdateManyAndReturnArgs>(args: SelectSubset<T, UserChallengeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserChallenge.
     * @param {UserChallengeUpsertArgs} args - Arguments to update or create a UserChallenge.
     * @example
     * // Update or create a UserChallenge
     * const userChallenge = await prisma.userChallenge.upsert({
     *   create: {
     *     // ... data to create a UserChallenge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserChallenge we want to update
     *   }
     * })
     */
    upsert<T extends UserChallengeUpsertArgs>(args: SelectSubset<T, UserChallengeUpsertArgs<ExtArgs>>): Prisma__UserChallengeClient<$Result.GetResult<Prisma.$UserChallengePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserChallenges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeCountArgs} args - Arguments to filter UserChallenges to count.
     * @example
     * // Count the number of UserChallenges
     * const count = await prisma.userChallenge.count({
     *   where: {
     *     // ... the filter for the UserChallenges we want to count
     *   }
     * })
    **/
    count<T extends UserChallengeCountArgs>(
      args?: Subset<T, UserChallengeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserChallengeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserChallengeAggregateArgs>(args: Subset<T, UserChallengeAggregateArgs>): Prisma.PrismaPromise<GetUserChallengeAggregateType<T>>

    /**
     * Group by UserChallenge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserChallengeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserChallengeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserChallengeGroupByArgs['orderBy'] }
        : { orderBy?: UserChallengeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserChallengeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserChallengeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserChallenge model
   */
  readonly fields: UserChallengeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserChallenge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserChallengeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    challenge<T extends ChallengeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChallengeDefaultArgs<ExtArgs>>): Prisma__ChallengeClient<$Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserChallenge model
   */
  interface UserChallengeFieldRefs {
    readonly id: FieldRef<"UserChallenge", 'String'>
    readonly user_id: FieldRef<"UserChallenge", 'String'>
    readonly challenge_id: FieldRef<"UserChallenge", 'String'>
    readonly completed: FieldRef<"UserChallenge", 'Boolean'>
    readonly progress: FieldRef<"UserChallenge", 'Int'>
    readonly tasks_completed: FieldRef<"UserChallenge", 'Json'>
    readonly completed_at: FieldRef<"UserChallenge", 'DateTime'>
    readonly created_at: FieldRef<"UserChallenge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserChallenge findUnique
   */
  export type UserChallengeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter, which UserChallenge to fetch.
     */
    where: UserChallengeWhereUniqueInput
  }

  /**
   * UserChallenge findUniqueOrThrow
   */
  export type UserChallengeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter, which UserChallenge to fetch.
     */
    where: UserChallengeWhereUniqueInput
  }

  /**
   * UserChallenge findFirst
   */
  export type UserChallengeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter, which UserChallenge to fetch.
     */
    where?: UserChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserChallenges to fetch.
     */
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserChallenges.
     */
    cursor?: UserChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserChallenges.
     */
    distinct?: UserChallengeScalarFieldEnum | UserChallengeScalarFieldEnum[]
  }

  /**
   * UserChallenge findFirstOrThrow
   */
  export type UserChallengeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter, which UserChallenge to fetch.
     */
    where?: UserChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserChallenges to fetch.
     */
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserChallenges.
     */
    cursor?: UserChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserChallenges.
     */
    distinct?: UserChallengeScalarFieldEnum | UserChallengeScalarFieldEnum[]
  }

  /**
   * UserChallenge findMany
   */
  export type UserChallengeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter, which UserChallenges to fetch.
     */
    where?: UserChallengeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserChallenges to fetch.
     */
    orderBy?: UserChallengeOrderByWithRelationInput | UserChallengeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserChallenges.
     */
    cursor?: UserChallengeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserChallenges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserChallenges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserChallenges.
     */
    distinct?: UserChallengeScalarFieldEnum | UserChallengeScalarFieldEnum[]
  }

  /**
   * UserChallenge create
   */
  export type UserChallengeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserChallenge.
     */
    data: XOR<UserChallengeCreateInput, UserChallengeUncheckedCreateInput>
  }

  /**
   * UserChallenge createMany
   */
  export type UserChallengeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserChallenges.
     */
    data: UserChallengeCreateManyInput | UserChallengeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserChallenge createManyAndReturn
   */
  export type UserChallengeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * The data used to create many UserChallenges.
     */
    data: UserChallengeCreateManyInput | UserChallengeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserChallenge update
   */
  export type UserChallengeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserChallenge.
     */
    data: XOR<UserChallengeUpdateInput, UserChallengeUncheckedUpdateInput>
    /**
     * Choose, which UserChallenge to update.
     */
    where: UserChallengeWhereUniqueInput
  }

  /**
   * UserChallenge updateMany
   */
  export type UserChallengeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserChallenges.
     */
    data: XOR<UserChallengeUpdateManyMutationInput, UserChallengeUncheckedUpdateManyInput>
    /**
     * Filter which UserChallenges to update
     */
    where?: UserChallengeWhereInput
    /**
     * Limit how many UserChallenges to update.
     */
    limit?: number
  }

  /**
   * UserChallenge updateManyAndReturn
   */
  export type UserChallengeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * The data used to update UserChallenges.
     */
    data: XOR<UserChallengeUpdateManyMutationInput, UserChallengeUncheckedUpdateManyInput>
    /**
     * Filter which UserChallenges to update
     */
    where?: UserChallengeWhereInput
    /**
     * Limit how many UserChallenges to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserChallenge upsert
   */
  export type UserChallengeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserChallenge to update in case it exists.
     */
    where: UserChallengeWhereUniqueInput
    /**
     * In case the UserChallenge found by the `where` argument doesn't exist, create a new UserChallenge with this data.
     */
    create: XOR<UserChallengeCreateInput, UserChallengeUncheckedCreateInput>
    /**
     * In case the UserChallenge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserChallengeUpdateInput, UserChallengeUncheckedUpdateInput>
  }

  /**
   * UserChallenge delete
   */
  export type UserChallengeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
    /**
     * Filter which UserChallenge to delete.
     */
    where: UserChallengeWhereUniqueInput
  }

  /**
   * UserChallenge deleteMany
   */
  export type UserChallengeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserChallenges to delete
     */
    where?: UserChallengeWhereInput
    /**
     * Limit how many UserChallenges to delete.
     */
    limit?: number
  }

  /**
   * UserChallenge without action
   */
  export type UserChallengeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserChallenge
     */
    select?: UserChallengeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserChallenge
     */
    omit?: UserChallengeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserChallengeInclude<ExtArgs> | null
  }


  /**
   * Model XpTransaction
   */

  export type AggregateXpTransaction = {
    _count: XpTransactionCountAggregateOutputType | null
    _avg: XpTransactionAvgAggregateOutputType | null
    _sum: XpTransactionSumAggregateOutputType | null
    _min: XpTransactionMinAggregateOutputType | null
    _max: XpTransactionMaxAggregateOutputType | null
  }

  export type XpTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type XpTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type XpTransactionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: number | null
    source: string | null
    reference: string | null
    description: string | null
    created_at: Date | null
  }

  export type XpTransactionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    amount: number | null
    source: string | null
    reference: string | null
    description: string | null
    created_at: Date | null
  }

  export type XpTransactionCountAggregateOutputType = {
    id: number
    user_id: number
    amount: number
    source: number
    reference: number
    description: number
    created_at: number
    _all: number
  }


  export type XpTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type XpTransactionSumAggregateInputType = {
    amount?: true
  }

  export type XpTransactionMinAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    source?: true
    reference?: true
    description?: true
    created_at?: true
  }

  export type XpTransactionMaxAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    source?: true
    reference?: true
    description?: true
    created_at?: true
  }

  export type XpTransactionCountAggregateInputType = {
    id?: true
    user_id?: true
    amount?: true
    source?: true
    reference?: true
    description?: true
    created_at?: true
    _all?: true
  }

  export type XpTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which XpTransaction to aggregate.
     */
    where?: XpTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XpTransactions to fetch.
     */
    orderBy?: XpTransactionOrderByWithRelationInput | XpTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: XpTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XpTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XpTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned XpTransactions
    **/
    _count?: true | XpTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: XpTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: XpTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: XpTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: XpTransactionMaxAggregateInputType
  }

  export type GetXpTransactionAggregateType<T extends XpTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateXpTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateXpTransaction[P]>
      : GetScalarType<T[P], AggregateXpTransaction[P]>
  }




  export type XpTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: XpTransactionWhereInput
    orderBy?: XpTransactionOrderByWithAggregationInput | XpTransactionOrderByWithAggregationInput[]
    by: XpTransactionScalarFieldEnum[] | XpTransactionScalarFieldEnum
    having?: XpTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: XpTransactionCountAggregateInputType | true
    _avg?: XpTransactionAvgAggregateInputType
    _sum?: XpTransactionSumAggregateInputType
    _min?: XpTransactionMinAggregateInputType
    _max?: XpTransactionMaxAggregateInputType
  }

  export type XpTransactionGroupByOutputType = {
    id: string
    user_id: string
    amount: number
    source: string
    reference: string | null
    description: string | null
    created_at: Date
    _count: XpTransactionCountAggregateOutputType | null
    _avg: XpTransactionAvgAggregateOutputType | null
    _sum: XpTransactionSumAggregateOutputType | null
    _min: XpTransactionMinAggregateOutputType | null
    _max: XpTransactionMaxAggregateOutputType | null
  }

  type GetXpTransactionGroupByPayload<T extends XpTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<XpTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof XpTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], XpTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], XpTransactionGroupByOutputType[P]>
        }
      >
    >


  export type XpTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    source?: boolean
    reference?: boolean
    description?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xpTransaction"]>

  export type XpTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    source?: boolean
    reference?: boolean
    description?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xpTransaction"]>

  export type XpTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    amount?: boolean
    source?: boolean
    reference?: boolean
    description?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["xpTransaction"]>

  export type XpTransactionSelectScalar = {
    id?: boolean
    user_id?: boolean
    amount?: boolean
    source?: boolean
    reference?: boolean
    description?: boolean
    created_at?: boolean
  }

  export type XpTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "amount" | "source" | "reference" | "description" | "created_at", ExtArgs["result"]["xpTransaction"]>
  export type XpTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type XpTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type XpTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $XpTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "XpTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      amount: number
      source: string
      reference: string | null
      description: string | null
      created_at: Date
    }, ExtArgs["result"]["xpTransaction"]>
    composites: {}
  }

  type XpTransactionGetPayload<S extends boolean | null | undefined | XpTransactionDefaultArgs> = $Result.GetResult<Prisma.$XpTransactionPayload, S>

  type XpTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<XpTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: XpTransactionCountAggregateInputType | true
    }

  export interface XpTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['XpTransaction'], meta: { name: 'XpTransaction' } }
    /**
     * Find zero or one XpTransaction that matches the filter.
     * @param {XpTransactionFindUniqueArgs} args - Arguments to find a XpTransaction
     * @example
     * // Get one XpTransaction
     * const xpTransaction = await prisma.xpTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends XpTransactionFindUniqueArgs>(args: SelectSubset<T, XpTransactionFindUniqueArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one XpTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {XpTransactionFindUniqueOrThrowArgs} args - Arguments to find a XpTransaction
     * @example
     * // Get one XpTransaction
     * const xpTransaction = await prisma.xpTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends XpTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, XpTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first XpTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionFindFirstArgs} args - Arguments to find a XpTransaction
     * @example
     * // Get one XpTransaction
     * const xpTransaction = await prisma.xpTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends XpTransactionFindFirstArgs>(args?: SelectSubset<T, XpTransactionFindFirstArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first XpTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionFindFirstOrThrowArgs} args - Arguments to find a XpTransaction
     * @example
     * // Get one XpTransaction
     * const xpTransaction = await prisma.xpTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends XpTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, XpTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more XpTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all XpTransactions
     * const xpTransactions = await prisma.xpTransaction.findMany()
     * 
     * // Get first 10 XpTransactions
     * const xpTransactions = await prisma.xpTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const xpTransactionWithIdOnly = await prisma.xpTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends XpTransactionFindManyArgs>(args?: SelectSubset<T, XpTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a XpTransaction.
     * @param {XpTransactionCreateArgs} args - Arguments to create a XpTransaction.
     * @example
     * // Create one XpTransaction
     * const XpTransaction = await prisma.xpTransaction.create({
     *   data: {
     *     // ... data to create a XpTransaction
     *   }
     * })
     * 
     */
    create<T extends XpTransactionCreateArgs>(args: SelectSubset<T, XpTransactionCreateArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many XpTransactions.
     * @param {XpTransactionCreateManyArgs} args - Arguments to create many XpTransactions.
     * @example
     * // Create many XpTransactions
     * const xpTransaction = await prisma.xpTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends XpTransactionCreateManyArgs>(args?: SelectSubset<T, XpTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many XpTransactions and returns the data saved in the database.
     * @param {XpTransactionCreateManyAndReturnArgs} args - Arguments to create many XpTransactions.
     * @example
     * // Create many XpTransactions
     * const xpTransaction = await prisma.xpTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many XpTransactions and only return the `id`
     * const xpTransactionWithIdOnly = await prisma.xpTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends XpTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, XpTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a XpTransaction.
     * @param {XpTransactionDeleteArgs} args - Arguments to delete one XpTransaction.
     * @example
     * // Delete one XpTransaction
     * const XpTransaction = await prisma.xpTransaction.delete({
     *   where: {
     *     // ... filter to delete one XpTransaction
     *   }
     * })
     * 
     */
    delete<T extends XpTransactionDeleteArgs>(args: SelectSubset<T, XpTransactionDeleteArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one XpTransaction.
     * @param {XpTransactionUpdateArgs} args - Arguments to update one XpTransaction.
     * @example
     * // Update one XpTransaction
     * const xpTransaction = await prisma.xpTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends XpTransactionUpdateArgs>(args: SelectSubset<T, XpTransactionUpdateArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more XpTransactions.
     * @param {XpTransactionDeleteManyArgs} args - Arguments to filter XpTransactions to delete.
     * @example
     * // Delete a few XpTransactions
     * const { count } = await prisma.xpTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends XpTransactionDeleteManyArgs>(args?: SelectSubset<T, XpTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more XpTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many XpTransactions
     * const xpTransaction = await prisma.xpTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends XpTransactionUpdateManyArgs>(args: SelectSubset<T, XpTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more XpTransactions and returns the data updated in the database.
     * @param {XpTransactionUpdateManyAndReturnArgs} args - Arguments to update many XpTransactions.
     * @example
     * // Update many XpTransactions
     * const xpTransaction = await prisma.xpTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more XpTransactions and only return the `id`
     * const xpTransactionWithIdOnly = await prisma.xpTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends XpTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, XpTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one XpTransaction.
     * @param {XpTransactionUpsertArgs} args - Arguments to update or create a XpTransaction.
     * @example
     * // Update or create a XpTransaction
     * const xpTransaction = await prisma.xpTransaction.upsert({
     *   create: {
     *     // ... data to create a XpTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the XpTransaction we want to update
     *   }
     * })
     */
    upsert<T extends XpTransactionUpsertArgs>(args: SelectSubset<T, XpTransactionUpsertArgs<ExtArgs>>): Prisma__XpTransactionClient<$Result.GetResult<Prisma.$XpTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of XpTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionCountArgs} args - Arguments to filter XpTransactions to count.
     * @example
     * // Count the number of XpTransactions
     * const count = await prisma.xpTransaction.count({
     *   where: {
     *     // ... the filter for the XpTransactions we want to count
     *   }
     * })
    **/
    count<T extends XpTransactionCountArgs>(
      args?: Subset<T, XpTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], XpTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a XpTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends XpTransactionAggregateArgs>(args: Subset<T, XpTransactionAggregateArgs>): Prisma.PrismaPromise<GetXpTransactionAggregateType<T>>

    /**
     * Group by XpTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {XpTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends XpTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: XpTransactionGroupByArgs['orderBy'] }
        : { orderBy?: XpTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, XpTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetXpTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the XpTransaction model
   */
  readonly fields: XpTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for XpTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__XpTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the XpTransaction model
   */
  interface XpTransactionFieldRefs {
    readonly id: FieldRef<"XpTransaction", 'String'>
    readonly user_id: FieldRef<"XpTransaction", 'String'>
    readonly amount: FieldRef<"XpTransaction", 'Int'>
    readonly source: FieldRef<"XpTransaction", 'String'>
    readonly reference: FieldRef<"XpTransaction", 'String'>
    readonly description: FieldRef<"XpTransaction", 'String'>
    readonly created_at: FieldRef<"XpTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * XpTransaction findUnique
   */
  export type XpTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter, which XpTransaction to fetch.
     */
    where: XpTransactionWhereUniqueInput
  }

  /**
   * XpTransaction findUniqueOrThrow
   */
  export type XpTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter, which XpTransaction to fetch.
     */
    where: XpTransactionWhereUniqueInput
  }

  /**
   * XpTransaction findFirst
   */
  export type XpTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter, which XpTransaction to fetch.
     */
    where?: XpTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XpTransactions to fetch.
     */
    orderBy?: XpTransactionOrderByWithRelationInput | XpTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for XpTransactions.
     */
    cursor?: XpTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XpTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XpTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of XpTransactions.
     */
    distinct?: XpTransactionScalarFieldEnum | XpTransactionScalarFieldEnum[]
  }

  /**
   * XpTransaction findFirstOrThrow
   */
  export type XpTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter, which XpTransaction to fetch.
     */
    where?: XpTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XpTransactions to fetch.
     */
    orderBy?: XpTransactionOrderByWithRelationInput | XpTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for XpTransactions.
     */
    cursor?: XpTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XpTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XpTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of XpTransactions.
     */
    distinct?: XpTransactionScalarFieldEnum | XpTransactionScalarFieldEnum[]
  }

  /**
   * XpTransaction findMany
   */
  export type XpTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter, which XpTransactions to fetch.
     */
    where?: XpTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of XpTransactions to fetch.
     */
    orderBy?: XpTransactionOrderByWithRelationInput | XpTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing XpTransactions.
     */
    cursor?: XpTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` XpTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` XpTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of XpTransactions.
     */
    distinct?: XpTransactionScalarFieldEnum | XpTransactionScalarFieldEnum[]
  }

  /**
   * XpTransaction create
   */
  export type XpTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a XpTransaction.
     */
    data: XOR<XpTransactionCreateInput, XpTransactionUncheckedCreateInput>
  }

  /**
   * XpTransaction createMany
   */
  export type XpTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many XpTransactions.
     */
    data: XpTransactionCreateManyInput | XpTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * XpTransaction createManyAndReturn
   */
  export type XpTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many XpTransactions.
     */
    data: XpTransactionCreateManyInput | XpTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * XpTransaction update
   */
  export type XpTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a XpTransaction.
     */
    data: XOR<XpTransactionUpdateInput, XpTransactionUncheckedUpdateInput>
    /**
     * Choose, which XpTransaction to update.
     */
    where: XpTransactionWhereUniqueInput
  }

  /**
   * XpTransaction updateMany
   */
  export type XpTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update XpTransactions.
     */
    data: XOR<XpTransactionUpdateManyMutationInput, XpTransactionUncheckedUpdateManyInput>
    /**
     * Filter which XpTransactions to update
     */
    where?: XpTransactionWhereInput
    /**
     * Limit how many XpTransactions to update.
     */
    limit?: number
  }

  /**
   * XpTransaction updateManyAndReturn
   */
  export type XpTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * The data used to update XpTransactions.
     */
    data: XOR<XpTransactionUpdateManyMutationInput, XpTransactionUncheckedUpdateManyInput>
    /**
     * Filter which XpTransactions to update
     */
    where?: XpTransactionWhereInput
    /**
     * Limit how many XpTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * XpTransaction upsert
   */
  export type XpTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the XpTransaction to update in case it exists.
     */
    where: XpTransactionWhereUniqueInput
    /**
     * In case the XpTransaction found by the `where` argument doesn't exist, create a new XpTransaction with this data.
     */
    create: XOR<XpTransactionCreateInput, XpTransactionUncheckedCreateInput>
    /**
     * In case the XpTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<XpTransactionUpdateInput, XpTransactionUncheckedUpdateInput>
  }

  /**
   * XpTransaction delete
   */
  export type XpTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
    /**
     * Filter which XpTransaction to delete.
     */
    where: XpTransactionWhereUniqueInput
  }

  /**
   * XpTransaction deleteMany
   */
  export type XpTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which XpTransactions to delete
     */
    where?: XpTransactionWhereInput
    /**
     * Limit how many XpTransactions to delete.
     */
    limit?: number
  }

  /**
   * XpTransaction without action
   */
  export type XpTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpTransaction
     */
    select?: XpTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the XpTransaction
     */
    omit?: XpTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: XpTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Pass
   */

  export type AggregatePass = {
    _count: PassCountAggregateOutputType | null
    _min: PassMinAggregateOutputType | null
    _max: PassMaxAggregateOutputType | null
  }

  export type PassMinAggregateOutputType = {
    id: string | null
    pass_id: string | null
    user_id: string | null
    title: string | null
    description: string | null
    tier: $Enums.Tier | null
    status: $Enums.PassStatus | null
    valid_until: Date | null
    created_at: Date | null
    claimed_at: Date | null
  }

  export type PassMaxAggregateOutputType = {
    id: string | null
    pass_id: string | null
    user_id: string | null
    title: string | null
    description: string | null
    tier: $Enums.Tier | null
    status: $Enums.PassStatus | null
    valid_until: Date | null
    created_at: Date | null
    claimed_at: Date | null
  }

  export type PassCountAggregateOutputType = {
    id: number
    pass_id: number
    user_id: number
    title: number
    description: number
    tier: number
    status: number
    valid_until: number
    created_at: number
    claimed_at: number
    _all: number
  }


  export type PassMinAggregateInputType = {
    id?: true
    pass_id?: true
    user_id?: true
    title?: true
    description?: true
    tier?: true
    status?: true
    valid_until?: true
    created_at?: true
    claimed_at?: true
  }

  export type PassMaxAggregateInputType = {
    id?: true
    pass_id?: true
    user_id?: true
    title?: true
    description?: true
    tier?: true
    status?: true
    valid_until?: true
    created_at?: true
    claimed_at?: true
  }

  export type PassCountAggregateInputType = {
    id?: true
    pass_id?: true
    user_id?: true
    title?: true
    description?: true
    tier?: true
    status?: true
    valid_until?: true
    created_at?: true
    claimed_at?: true
    _all?: true
  }

  export type PassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pass to aggregate.
     */
    where?: PassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passes to fetch.
     */
    orderBy?: PassOrderByWithRelationInput | PassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passes
    **/
    _count?: true | PassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PassMaxAggregateInputType
  }

  export type GetPassAggregateType<T extends PassAggregateArgs> = {
        [P in keyof T & keyof AggregatePass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePass[P]>
      : GetScalarType<T[P], AggregatePass[P]>
  }




  export type PassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PassWhereInput
    orderBy?: PassOrderByWithAggregationInput | PassOrderByWithAggregationInput[]
    by: PassScalarFieldEnum[] | PassScalarFieldEnum
    having?: PassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PassCountAggregateInputType | true
    _min?: PassMinAggregateInputType
    _max?: PassMaxAggregateInputType
  }

  export type PassGroupByOutputType = {
    id: string
    pass_id: string
    user_id: string | null
    title: string
    description: string | null
    tier: $Enums.Tier
    status: $Enums.PassStatus
    valid_until: Date | null
    created_at: Date
    claimed_at: Date | null
    _count: PassCountAggregateOutputType | null
    _min: PassMinAggregateOutputType | null
    _max: PassMaxAggregateOutputType | null
  }

  type GetPassGroupByPayload<T extends PassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PassGroupByOutputType[P]>
            : GetScalarType<T[P], PassGroupByOutputType[P]>
        }
      >
    >


  export type PassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pass_id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    status?: boolean
    valid_until?: boolean
    created_at?: boolean
    claimed_at?: boolean
  }, ExtArgs["result"]["pass"]>

  export type PassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pass_id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    status?: boolean
    valid_until?: boolean
    created_at?: boolean
    claimed_at?: boolean
  }, ExtArgs["result"]["pass"]>

  export type PassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pass_id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    status?: boolean
    valid_until?: boolean
    created_at?: boolean
    claimed_at?: boolean
  }, ExtArgs["result"]["pass"]>

  export type PassSelectScalar = {
    id?: boolean
    pass_id?: boolean
    user_id?: boolean
    title?: boolean
    description?: boolean
    tier?: boolean
    status?: boolean
    valid_until?: boolean
    created_at?: boolean
    claimed_at?: boolean
  }

  export type PassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pass_id" | "user_id" | "title" | "description" | "tier" | "status" | "valid_until" | "created_at" | "claimed_at", ExtArgs["result"]["pass"]>

  export type $PassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pass"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pass_id: string
      user_id: string | null
      title: string
      description: string | null
      tier: $Enums.Tier
      status: $Enums.PassStatus
      valid_until: Date | null
      created_at: Date
      claimed_at: Date | null
    }, ExtArgs["result"]["pass"]>
    composites: {}
  }

  type PassGetPayload<S extends boolean | null | undefined | PassDefaultArgs> = $Result.GetResult<Prisma.$PassPayload, S>

  type PassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PassCountAggregateInputType | true
    }

  export interface PassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pass'], meta: { name: 'Pass' } }
    /**
     * Find zero or one Pass that matches the filter.
     * @param {PassFindUniqueArgs} args - Arguments to find a Pass
     * @example
     * // Get one Pass
     * const pass = await prisma.pass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PassFindUniqueArgs>(args: SelectSubset<T, PassFindUniqueArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PassFindUniqueOrThrowArgs} args - Arguments to find a Pass
     * @example
     * // Get one Pass
     * const pass = await prisma.pass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PassFindUniqueOrThrowArgs>(args: SelectSubset<T, PassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassFindFirstArgs} args - Arguments to find a Pass
     * @example
     * // Get one Pass
     * const pass = await prisma.pass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PassFindFirstArgs>(args?: SelectSubset<T, PassFindFirstArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassFindFirstOrThrowArgs} args - Arguments to find a Pass
     * @example
     * // Get one Pass
     * const pass = await prisma.pass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PassFindFirstOrThrowArgs>(args?: SelectSubset<T, PassFindFirstOrThrowArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Passes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passes
     * const passes = await prisma.pass.findMany()
     * 
     * // Get first 10 Passes
     * const passes = await prisma.pass.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const passWithIdOnly = await prisma.pass.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PassFindManyArgs>(args?: SelectSubset<T, PassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pass.
     * @param {PassCreateArgs} args - Arguments to create a Pass.
     * @example
     * // Create one Pass
     * const Pass = await prisma.pass.create({
     *   data: {
     *     // ... data to create a Pass
     *   }
     * })
     * 
     */
    create<T extends PassCreateArgs>(args: SelectSubset<T, PassCreateArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Passes.
     * @param {PassCreateManyArgs} args - Arguments to create many Passes.
     * @example
     * // Create many Passes
     * const pass = await prisma.pass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PassCreateManyArgs>(args?: SelectSubset<T, PassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Passes and returns the data saved in the database.
     * @param {PassCreateManyAndReturnArgs} args - Arguments to create many Passes.
     * @example
     * // Create many Passes
     * const pass = await prisma.pass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Passes and only return the `id`
     * const passWithIdOnly = await prisma.pass.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PassCreateManyAndReturnArgs>(args?: SelectSubset<T, PassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pass.
     * @param {PassDeleteArgs} args - Arguments to delete one Pass.
     * @example
     * // Delete one Pass
     * const Pass = await prisma.pass.delete({
     *   where: {
     *     // ... filter to delete one Pass
     *   }
     * })
     * 
     */
    delete<T extends PassDeleteArgs>(args: SelectSubset<T, PassDeleteArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pass.
     * @param {PassUpdateArgs} args - Arguments to update one Pass.
     * @example
     * // Update one Pass
     * const pass = await prisma.pass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PassUpdateArgs>(args: SelectSubset<T, PassUpdateArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Passes.
     * @param {PassDeleteManyArgs} args - Arguments to filter Passes to delete.
     * @example
     * // Delete a few Passes
     * const { count } = await prisma.pass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PassDeleteManyArgs>(args?: SelectSubset<T, PassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passes
     * const pass = await prisma.pass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PassUpdateManyArgs>(args: SelectSubset<T, PassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passes and returns the data updated in the database.
     * @param {PassUpdateManyAndReturnArgs} args - Arguments to update many Passes.
     * @example
     * // Update many Passes
     * const pass = await prisma.pass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Passes and only return the `id`
     * const passWithIdOnly = await prisma.pass.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PassUpdateManyAndReturnArgs>(args: SelectSubset<T, PassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pass.
     * @param {PassUpsertArgs} args - Arguments to update or create a Pass.
     * @example
     * // Update or create a Pass
     * const pass = await prisma.pass.upsert({
     *   create: {
     *     // ... data to create a Pass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pass we want to update
     *   }
     * })
     */
    upsert<T extends PassUpsertArgs>(args: SelectSubset<T, PassUpsertArgs<ExtArgs>>): Prisma__PassClient<$Result.GetResult<Prisma.$PassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Passes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassCountArgs} args - Arguments to filter Passes to count.
     * @example
     * // Count the number of Passes
     * const count = await prisma.pass.count({
     *   where: {
     *     // ... the filter for the Passes we want to count
     *   }
     * })
    **/
    count<T extends PassCountArgs>(
      args?: Subset<T, PassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PassAggregateArgs>(args: Subset<T, PassAggregateArgs>): Prisma.PrismaPromise<GetPassAggregateType<T>>

    /**
     * Group by Pass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PassGroupByArgs['orderBy'] }
        : { orderBy?: PassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pass model
   */
  readonly fields: PassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pass model
   */
  interface PassFieldRefs {
    readonly id: FieldRef<"Pass", 'String'>
    readonly pass_id: FieldRef<"Pass", 'String'>
    readonly user_id: FieldRef<"Pass", 'String'>
    readonly title: FieldRef<"Pass", 'String'>
    readonly description: FieldRef<"Pass", 'String'>
    readonly tier: FieldRef<"Pass", 'Tier'>
    readonly status: FieldRef<"Pass", 'PassStatus'>
    readonly valid_until: FieldRef<"Pass", 'DateTime'>
    readonly created_at: FieldRef<"Pass", 'DateTime'>
    readonly claimed_at: FieldRef<"Pass", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pass findUnique
   */
  export type PassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter, which Pass to fetch.
     */
    where: PassWhereUniqueInput
  }

  /**
   * Pass findUniqueOrThrow
   */
  export type PassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter, which Pass to fetch.
     */
    where: PassWhereUniqueInput
  }

  /**
   * Pass findFirst
   */
  export type PassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter, which Pass to fetch.
     */
    where?: PassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passes to fetch.
     */
    orderBy?: PassOrderByWithRelationInput | PassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passes.
     */
    cursor?: PassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passes.
     */
    distinct?: PassScalarFieldEnum | PassScalarFieldEnum[]
  }

  /**
   * Pass findFirstOrThrow
   */
  export type PassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter, which Pass to fetch.
     */
    where?: PassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passes to fetch.
     */
    orderBy?: PassOrderByWithRelationInput | PassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passes.
     */
    cursor?: PassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passes.
     */
    distinct?: PassScalarFieldEnum | PassScalarFieldEnum[]
  }

  /**
   * Pass findMany
   */
  export type PassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter, which Passes to fetch.
     */
    where?: PassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passes to fetch.
     */
    orderBy?: PassOrderByWithRelationInput | PassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passes.
     */
    cursor?: PassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passes.
     */
    distinct?: PassScalarFieldEnum | PassScalarFieldEnum[]
  }

  /**
   * Pass create
   */
  export type PassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * The data needed to create a Pass.
     */
    data: XOR<PassCreateInput, PassUncheckedCreateInput>
  }

  /**
   * Pass createMany
   */
  export type PassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Passes.
     */
    data: PassCreateManyInput | PassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pass createManyAndReturn
   */
  export type PassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * The data used to create many Passes.
     */
    data: PassCreateManyInput | PassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pass update
   */
  export type PassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * The data needed to update a Pass.
     */
    data: XOR<PassUpdateInput, PassUncheckedUpdateInput>
    /**
     * Choose, which Pass to update.
     */
    where: PassWhereUniqueInput
  }

  /**
   * Pass updateMany
   */
  export type PassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Passes.
     */
    data: XOR<PassUpdateManyMutationInput, PassUncheckedUpdateManyInput>
    /**
     * Filter which Passes to update
     */
    where?: PassWhereInput
    /**
     * Limit how many Passes to update.
     */
    limit?: number
  }

  /**
   * Pass updateManyAndReturn
   */
  export type PassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * The data used to update Passes.
     */
    data: XOR<PassUpdateManyMutationInput, PassUncheckedUpdateManyInput>
    /**
     * Filter which Passes to update
     */
    where?: PassWhereInput
    /**
     * Limit how many Passes to update.
     */
    limit?: number
  }

  /**
   * Pass upsert
   */
  export type PassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * The filter to search for the Pass to update in case it exists.
     */
    where: PassWhereUniqueInput
    /**
     * In case the Pass found by the `where` argument doesn't exist, create a new Pass with this data.
     */
    create: XOR<PassCreateInput, PassUncheckedCreateInput>
    /**
     * In case the Pass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PassUpdateInput, PassUncheckedUpdateInput>
  }

  /**
   * Pass delete
   */
  export type PassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
    /**
     * Filter which Pass to delete.
     */
    where: PassWhereUniqueInput
  }

  /**
   * Pass deleteMany
   */
  export type PassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Passes to delete
     */
    where?: PassWhereInput
    /**
     * Limit how many Passes to delete.
     */
    limit?: number
  }

  /**
   * Pass without action
   */
  export type PassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pass
     */
    select?: PassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pass
     */
    omit?: PassOmit<ExtArgs> | null
  }


  /**
   * Model FriendActivity
   */

  export type AggregateFriendActivity = {
    _count: FriendActivityCountAggregateOutputType | null
    _avg: FriendActivityAvgAggregateOutputType | null
    _sum: FriendActivitySumAggregateOutputType | null
    _min: FriendActivityMinAggregateOutputType | null
    _max: FriendActivityMaxAggregateOutputType | null
  }

  export type FriendActivityAvgAggregateOutputType = {
    xp_change: number | null
  }

  export type FriendActivitySumAggregateOutputType = {
    xp_change: number | null
  }

  export type FriendActivityMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    friend_name: string | null
    activity: string | null
    xp_change: number | null
    created_at: Date | null
  }

  export type FriendActivityMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    friend_name: string | null
    activity: string | null
    xp_change: number | null
    created_at: Date | null
  }

  export type FriendActivityCountAggregateOutputType = {
    id: number
    user_id: number
    friend_name: number
    activity: number
    xp_change: number
    created_at: number
    _all: number
  }


  export type FriendActivityAvgAggregateInputType = {
    xp_change?: true
  }

  export type FriendActivitySumAggregateInputType = {
    xp_change?: true
  }

  export type FriendActivityMinAggregateInputType = {
    id?: true
    user_id?: true
    friend_name?: true
    activity?: true
    xp_change?: true
    created_at?: true
  }

  export type FriendActivityMaxAggregateInputType = {
    id?: true
    user_id?: true
    friend_name?: true
    activity?: true
    xp_change?: true
    created_at?: true
  }

  export type FriendActivityCountAggregateInputType = {
    id?: true
    user_id?: true
    friend_name?: true
    activity?: true
    xp_change?: true
    created_at?: true
    _all?: true
  }

  export type FriendActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendActivity to aggregate.
     */
    where?: FriendActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendActivities to fetch.
     */
    orderBy?: FriendActivityOrderByWithRelationInput | FriendActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendActivities
    **/
    _count?: true | FriendActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FriendActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FriendActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendActivityMaxAggregateInputType
  }

  export type GetFriendActivityAggregateType<T extends FriendActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendActivity[P]>
      : GetScalarType<T[P], AggregateFriendActivity[P]>
  }




  export type FriendActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendActivityWhereInput
    orderBy?: FriendActivityOrderByWithAggregationInput | FriendActivityOrderByWithAggregationInput[]
    by: FriendActivityScalarFieldEnum[] | FriendActivityScalarFieldEnum
    having?: FriendActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendActivityCountAggregateInputType | true
    _avg?: FriendActivityAvgAggregateInputType
    _sum?: FriendActivitySumAggregateInputType
    _min?: FriendActivityMinAggregateInputType
    _max?: FriendActivityMaxAggregateInputType
  }

  export type FriendActivityGroupByOutputType = {
    id: string
    user_id: string
    friend_name: string
    activity: string
    xp_change: number | null
    created_at: Date
    _count: FriendActivityCountAggregateOutputType | null
    _avg: FriendActivityAvgAggregateOutputType | null
    _sum: FriendActivitySumAggregateOutputType | null
    _min: FriendActivityMinAggregateOutputType | null
    _max: FriendActivityMaxAggregateOutputType | null
  }

  type GetFriendActivityGroupByPayload<T extends FriendActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendActivityGroupByOutputType[P]>
            : GetScalarType<T[P], FriendActivityGroupByOutputType[P]>
        }
      >
    >


  export type FriendActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    friend_name?: boolean
    activity?: boolean
    xp_change?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendActivity"]>

  export type FriendActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    friend_name?: boolean
    activity?: boolean
    xp_change?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendActivity"]>

  export type FriendActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    friend_name?: boolean
    activity?: boolean
    xp_change?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendActivity"]>

  export type FriendActivitySelectScalar = {
    id?: boolean
    user_id?: boolean
    friend_name?: boolean
    activity?: boolean
    xp_change?: boolean
    created_at?: boolean
  }

  export type FriendActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "friend_name" | "activity" | "xp_change" | "created_at", ExtArgs["result"]["friendActivity"]>
  export type FriendActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendActivity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      friend_name: string
      activity: string
      xp_change: number | null
      created_at: Date
    }, ExtArgs["result"]["friendActivity"]>
    composites: {}
  }

  type FriendActivityGetPayload<S extends boolean | null | undefined | FriendActivityDefaultArgs> = $Result.GetResult<Prisma.$FriendActivityPayload, S>

  type FriendActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendActivityCountAggregateInputType | true
    }

  export interface FriendActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendActivity'], meta: { name: 'FriendActivity' } }
    /**
     * Find zero or one FriendActivity that matches the filter.
     * @param {FriendActivityFindUniqueArgs} args - Arguments to find a FriendActivity
     * @example
     * // Get one FriendActivity
     * const friendActivity = await prisma.friendActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendActivityFindUniqueArgs>(args: SelectSubset<T, FriendActivityFindUniqueArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendActivityFindUniqueOrThrowArgs} args - Arguments to find a FriendActivity
     * @example
     * // Get one FriendActivity
     * const friendActivity = await prisma.friendActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityFindFirstArgs} args - Arguments to find a FriendActivity
     * @example
     * // Get one FriendActivity
     * const friendActivity = await prisma.friendActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendActivityFindFirstArgs>(args?: SelectSubset<T, FriendActivityFindFirstArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityFindFirstOrThrowArgs} args - Arguments to find a FriendActivity
     * @example
     * // Get one FriendActivity
     * const friendActivity = await prisma.friendActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendActivities
     * const friendActivities = await prisma.friendActivity.findMany()
     * 
     * // Get first 10 FriendActivities
     * const friendActivities = await prisma.friendActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendActivityWithIdOnly = await prisma.friendActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendActivityFindManyArgs>(args?: SelectSubset<T, FriendActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendActivity.
     * @param {FriendActivityCreateArgs} args - Arguments to create a FriendActivity.
     * @example
     * // Create one FriendActivity
     * const FriendActivity = await prisma.friendActivity.create({
     *   data: {
     *     // ... data to create a FriendActivity
     *   }
     * })
     * 
     */
    create<T extends FriendActivityCreateArgs>(args: SelectSubset<T, FriendActivityCreateArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendActivities.
     * @param {FriendActivityCreateManyArgs} args - Arguments to create many FriendActivities.
     * @example
     * // Create many FriendActivities
     * const friendActivity = await prisma.friendActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendActivityCreateManyArgs>(args?: SelectSubset<T, FriendActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendActivities and returns the data saved in the database.
     * @param {FriendActivityCreateManyAndReturnArgs} args - Arguments to create many FriendActivities.
     * @example
     * // Create many FriendActivities
     * const friendActivity = await prisma.friendActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendActivities and only return the `id`
     * const friendActivityWithIdOnly = await prisma.friendActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendActivity.
     * @param {FriendActivityDeleteArgs} args - Arguments to delete one FriendActivity.
     * @example
     * // Delete one FriendActivity
     * const FriendActivity = await prisma.friendActivity.delete({
     *   where: {
     *     // ... filter to delete one FriendActivity
     *   }
     * })
     * 
     */
    delete<T extends FriendActivityDeleteArgs>(args: SelectSubset<T, FriendActivityDeleteArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendActivity.
     * @param {FriendActivityUpdateArgs} args - Arguments to update one FriendActivity.
     * @example
     * // Update one FriendActivity
     * const friendActivity = await prisma.friendActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendActivityUpdateArgs>(args: SelectSubset<T, FriendActivityUpdateArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendActivities.
     * @param {FriendActivityDeleteManyArgs} args - Arguments to filter FriendActivities to delete.
     * @example
     * // Delete a few FriendActivities
     * const { count } = await prisma.friendActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendActivityDeleteManyArgs>(args?: SelectSubset<T, FriendActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendActivities
     * const friendActivity = await prisma.friendActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendActivityUpdateManyArgs>(args: SelectSubset<T, FriendActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendActivities and returns the data updated in the database.
     * @param {FriendActivityUpdateManyAndReturnArgs} args - Arguments to update many FriendActivities.
     * @example
     * // Update many FriendActivities
     * const friendActivity = await prisma.friendActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendActivities and only return the `id`
     * const friendActivityWithIdOnly = await prisma.friendActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendActivity.
     * @param {FriendActivityUpsertArgs} args - Arguments to update or create a FriendActivity.
     * @example
     * // Update or create a FriendActivity
     * const friendActivity = await prisma.friendActivity.upsert({
     *   create: {
     *     // ... data to create a FriendActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendActivity we want to update
     *   }
     * })
     */
    upsert<T extends FriendActivityUpsertArgs>(args: SelectSubset<T, FriendActivityUpsertArgs<ExtArgs>>): Prisma__FriendActivityClient<$Result.GetResult<Prisma.$FriendActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityCountArgs} args - Arguments to filter FriendActivities to count.
     * @example
     * // Count the number of FriendActivities
     * const count = await prisma.friendActivity.count({
     *   where: {
     *     // ... the filter for the FriendActivities we want to count
     *   }
     * })
    **/
    count<T extends FriendActivityCountArgs>(
      args?: Subset<T, FriendActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendActivityAggregateArgs>(args: Subset<T, FriendActivityAggregateArgs>): Prisma.PrismaPromise<GetFriendActivityAggregateType<T>>

    /**
     * Group by FriendActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendActivityGroupByArgs['orderBy'] }
        : { orderBy?: FriendActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendActivity model
   */
  readonly fields: FriendActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendActivity model
   */
  interface FriendActivityFieldRefs {
    readonly id: FieldRef<"FriendActivity", 'String'>
    readonly user_id: FieldRef<"FriendActivity", 'String'>
    readonly friend_name: FieldRef<"FriendActivity", 'String'>
    readonly activity: FieldRef<"FriendActivity", 'String'>
    readonly xp_change: FieldRef<"FriendActivity", 'Int'>
    readonly created_at: FieldRef<"FriendActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendActivity findUnique
   */
  export type FriendActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter, which FriendActivity to fetch.
     */
    where: FriendActivityWhereUniqueInput
  }

  /**
   * FriendActivity findUniqueOrThrow
   */
  export type FriendActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter, which FriendActivity to fetch.
     */
    where: FriendActivityWhereUniqueInput
  }

  /**
   * FriendActivity findFirst
   */
  export type FriendActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter, which FriendActivity to fetch.
     */
    where?: FriendActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendActivities to fetch.
     */
    orderBy?: FriendActivityOrderByWithRelationInput | FriendActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendActivities.
     */
    cursor?: FriendActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendActivities.
     */
    distinct?: FriendActivityScalarFieldEnum | FriendActivityScalarFieldEnum[]
  }

  /**
   * FriendActivity findFirstOrThrow
   */
  export type FriendActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter, which FriendActivity to fetch.
     */
    where?: FriendActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendActivities to fetch.
     */
    orderBy?: FriendActivityOrderByWithRelationInput | FriendActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendActivities.
     */
    cursor?: FriendActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendActivities.
     */
    distinct?: FriendActivityScalarFieldEnum | FriendActivityScalarFieldEnum[]
  }

  /**
   * FriendActivity findMany
   */
  export type FriendActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter, which FriendActivities to fetch.
     */
    where?: FriendActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendActivities to fetch.
     */
    orderBy?: FriendActivityOrderByWithRelationInput | FriendActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendActivities.
     */
    cursor?: FriendActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendActivities.
     */
    distinct?: FriendActivityScalarFieldEnum | FriendActivityScalarFieldEnum[]
  }

  /**
   * FriendActivity create
   */
  export type FriendActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendActivity.
     */
    data: XOR<FriendActivityCreateInput, FriendActivityUncheckedCreateInput>
  }

  /**
   * FriendActivity createMany
   */
  export type FriendActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendActivities.
     */
    data: FriendActivityCreateManyInput | FriendActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendActivity createManyAndReturn
   */
  export type FriendActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * The data used to create many FriendActivities.
     */
    data: FriendActivityCreateManyInput | FriendActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendActivity update
   */
  export type FriendActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendActivity.
     */
    data: XOR<FriendActivityUpdateInput, FriendActivityUncheckedUpdateInput>
    /**
     * Choose, which FriendActivity to update.
     */
    where: FriendActivityWhereUniqueInput
  }

  /**
   * FriendActivity updateMany
   */
  export type FriendActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendActivities.
     */
    data: XOR<FriendActivityUpdateManyMutationInput, FriendActivityUncheckedUpdateManyInput>
    /**
     * Filter which FriendActivities to update
     */
    where?: FriendActivityWhereInput
    /**
     * Limit how many FriendActivities to update.
     */
    limit?: number
  }

  /**
   * FriendActivity updateManyAndReturn
   */
  export type FriendActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * The data used to update FriendActivities.
     */
    data: XOR<FriendActivityUpdateManyMutationInput, FriendActivityUncheckedUpdateManyInput>
    /**
     * Filter which FriendActivities to update
     */
    where?: FriendActivityWhereInput
    /**
     * Limit how many FriendActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendActivity upsert
   */
  export type FriendActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendActivity to update in case it exists.
     */
    where: FriendActivityWhereUniqueInput
    /**
     * In case the FriendActivity found by the `where` argument doesn't exist, create a new FriendActivity with this data.
     */
    create: XOR<FriendActivityCreateInput, FriendActivityUncheckedCreateInput>
    /**
     * In case the FriendActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendActivityUpdateInput, FriendActivityUncheckedUpdateInput>
  }

  /**
   * FriendActivity delete
   */
  export type FriendActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
    /**
     * Filter which FriendActivity to delete.
     */
    where: FriendActivityWhereUniqueInput
  }

  /**
   * FriendActivity deleteMany
   */
  export type FriendActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendActivities to delete
     */
    where?: FriendActivityWhereInput
    /**
     * Limit how many FriendActivities to delete.
     */
    limit?: number
  }

  /**
   * FriendActivity without action
   */
  export type FriendActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendActivity
     */
    select?: FriendActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendActivity
     */
    omit?: FriendActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendActivityInclude<ExtArgs> | null
  }


  /**
   * Model RecentActivity
   */

  export type AggregateRecentActivity = {
    _count: RecentActivityCountAggregateOutputType | null
    _avg: RecentActivityAvgAggregateOutputType | null
    _sum: RecentActivitySumAggregateOutputType | null
    _min: RecentActivityMinAggregateOutputType | null
    _max: RecentActivityMaxAggregateOutputType | null
  }

  export type RecentActivityAvgAggregateOutputType = {
    xp_earned: number | null
  }

  export type RecentActivitySumAggregateOutputType = {
    xp_earned: number | null
  }

  export type RecentActivityMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    activity: string | null
    description: string | null
    xp_earned: number | null
    created_at: Date | null
  }

  export type RecentActivityMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    activity: string | null
    description: string | null
    xp_earned: number | null
    created_at: Date | null
  }

  export type RecentActivityCountAggregateOutputType = {
    id: number
    user_id: number
    activity: number
    description: number
    xp_earned: number
    created_at: number
    _all: number
  }


  export type RecentActivityAvgAggregateInputType = {
    xp_earned?: true
  }

  export type RecentActivitySumAggregateInputType = {
    xp_earned?: true
  }

  export type RecentActivityMinAggregateInputType = {
    id?: true
    user_id?: true
    activity?: true
    description?: true
    xp_earned?: true
    created_at?: true
  }

  export type RecentActivityMaxAggregateInputType = {
    id?: true
    user_id?: true
    activity?: true
    description?: true
    xp_earned?: true
    created_at?: true
  }

  export type RecentActivityCountAggregateInputType = {
    id?: true
    user_id?: true
    activity?: true
    description?: true
    xp_earned?: true
    created_at?: true
    _all?: true
  }

  export type RecentActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecentActivity to aggregate.
     */
    where?: RecentActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecentActivities to fetch.
     */
    orderBy?: RecentActivityOrderByWithRelationInput | RecentActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecentActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecentActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecentActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecentActivities
    **/
    _count?: true | RecentActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecentActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecentActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecentActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecentActivityMaxAggregateInputType
  }

  export type GetRecentActivityAggregateType<T extends RecentActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateRecentActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecentActivity[P]>
      : GetScalarType<T[P], AggregateRecentActivity[P]>
  }




  export type RecentActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecentActivityWhereInput
    orderBy?: RecentActivityOrderByWithAggregationInput | RecentActivityOrderByWithAggregationInput[]
    by: RecentActivityScalarFieldEnum[] | RecentActivityScalarFieldEnum
    having?: RecentActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecentActivityCountAggregateInputType | true
    _avg?: RecentActivityAvgAggregateInputType
    _sum?: RecentActivitySumAggregateInputType
    _min?: RecentActivityMinAggregateInputType
    _max?: RecentActivityMaxAggregateInputType
  }

  export type RecentActivityGroupByOutputType = {
    id: string
    user_id: string
    activity: string
    description: string | null
    xp_earned: number
    created_at: Date
    _count: RecentActivityCountAggregateOutputType | null
    _avg: RecentActivityAvgAggregateOutputType | null
    _sum: RecentActivitySumAggregateOutputType | null
    _min: RecentActivityMinAggregateOutputType | null
    _max: RecentActivityMaxAggregateOutputType | null
  }

  type GetRecentActivityGroupByPayload<T extends RecentActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecentActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecentActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecentActivityGroupByOutputType[P]>
            : GetScalarType<T[P], RecentActivityGroupByOutputType[P]>
        }
      >
    >


  export type RecentActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    activity?: boolean
    description?: boolean
    xp_earned?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recentActivity"]>

  export type RecentActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    activity?: boolean
    description?: boolean
    xp_earned?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recentActivity"]>

  export type RecentActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    activity?: boolean
    description?: boolean
    xp_earned?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recentActivity"]>

  export type RecentActivitySelectScalar = {
    id?: boolean
    user_id?: boolean
    activity?: boolean
    description?: boolean
    xp_earned?: boolean
    created_at?: boolean
  }

  export type RecentActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "activity" | "description" | "xp_earned" | "created_at", ExtArgs["result"]["recentActivity"]>
  export type RecentActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecentActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RecentActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RecentActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecentActivity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      activity: string
      description: string | null
      xp_earned: number
      created_at: Date
    }, ExtArgs["result"]["recentActivity"]>
    composites: {}
  }

  type RecentActivityGetPayload<S extends boolean | null | undefined | RecentActivityDefaultArgs> = $Result.GetResult<Prisma.$RecentActivityPayload, S>

  type RecentActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecentActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecentActivityCountAggregateInputType | true
    }

  export interface RecentActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecentActivity'], meta: { name: 'RecentActivity' } }
    /**
     * Find zero or one RecentActivity that matches the filter.
     * @param {RecentActivityFindUniqueArgs} args - Arguments to find a RecentActivity
     * @example
     * // Get one RecentActivity
     * const recentActivity = await prisma.recentActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecentActivityFindUniqueArgs>(args: SelectSubset<T, RecentActivityFindUniqueArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RecentActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecentActivityFindUniqueOrThrowArgs} args - Arguments to find a RecentActivity
     * @example
     * // Get one RecentActivity
     * const recentActivity = await prisma.recentActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecentActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, RecentActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecentActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityFindFirstArgs} args - Arguments to find a RecentActivity
     * @example
     * // Get one RecentActivity
     * const recentActivity = await prisma.recentActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecentActivityFindFirstArgs>(args?: SelectSubset<T, RecentActivityFindFirstArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RecentActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityFindFirstOrThrowArgs} args - Arguments to find a RecentActivity
     * @example
     * // Get one RecentActivity
     * const recentActivity = await prisma.recentActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecentActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, RecentActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RecentActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecentActivities
     * const recentActivities = await prisma.recentActivity.findMany()
     * 
     * // Get first 10 RecentActivities
     * const recentActivities = await prisma.recentActivity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recentActivityWithIdOnly = await prisma.recentActivity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecentActivityFindManyArgs>(args?: SelectSubset<T, RecentActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RecentActivity.
     * @param {RecentActivityCreateArgs} args - Arguments to create a RecentActivity.
     * @example
     * // Create one RecentActivity
     * const RecentActivity = await prisma.recentActivity.create({
     *   data: {
     *     // ... data to create a RecentActivity
     *   }
     * })
     * 
     */
    create<T extends RecentActivityCreateArgs>(args: SelectSubset<T, RecentActivityCreateArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RecentActivities.
     * @param {RecentActivityCreateManyArgs} args - Arguments to create many RecentActivities.
     * @example
     * // Create many RecentActivities
     * const recentActivity = await prisma.recentActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecentActivityCreateManyArgs>(args?: SelectSubset<T, RecentActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecentActivities and returns the data saved in the database.
     * @param {RecentActivityCreateManyAndReturnArgs} args - Arguments to create many RecentActivities.
     * @example
     * // Create many RecentActivities
     * const recentActivity = await prisma.recentActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecentActivities and only return the `id`
     * const recentActivityWithIdOnly = await prisma.recentActivity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecentActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, RecentActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RecentActivity.
     * @param {RecentActivityDeleteArgs} args - Arguments to delete one RecentActivity.
     * @example
     * // Delete one RecentActivity
     * const RecentActivity = await prisma.recentActivity.delete({
     *   where: {
     *     // ... filter to delete one RecentActivity
     *   }
     * })
     * 
     */
    delete<T extends RecentActivityDeleteArgs>(args: SelectSubset<T, RecentActivityDeleteArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RecentActivity.
     * @param {RecentActivityUpdateArgs} args - Arguments to update one RecentActivity.
     * @example
     * // Update one RecentActivity
     * const recentActivity = await prisma.recentActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecentActivityUpdateArgs>(args: SelectSubset<T, RecentActivityUpdateArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RecentActivities.
     * @param {RecentActivityDeleteManyArgs} args - Arguments to filter RecentActivities to delete.
     * @example
     * // Delete a few RecentActivities
     * const { count } = await prisma.recentActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecentActivityDeleteManyArgs>(args?: SelectSubset<T, RecentActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecentActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecentActivities
     * const recentActivity = await prisma.recentActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecentActivityUpdateManyArgs>(args: SelectSubset<T, RecentActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecentActivities and returns the data updated in the database.
     * @param {RecentActivityUpdateManyAndReturnArgs} args - Arguments to update many RecentActivities.
     * @example
     * // Update many RecentActivities
     * const recentActivity = await prisma.recentActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RecentActivities and only return the `id`
     * const recentActivityWithIdOnly = await prisma.recentActivity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecentActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, RecentActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RecentActivity.
     * @param {RecentActivityUpsertArgs} args - Arguments to update or create a RecentActivity.
     * @example
     * // Update or create a RecentActivity
     * const recentActivity = await prisma.recentActivity.upsert({
     *   create: {
     *     // ... data to create a RecentActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecentActivity we want to update
     *   }
     * })
     */
    upsert<T extends RecentActivityUpsertArgs>(args: SelectSubset<T, RecentActivityUpsertArgs<ExtArgs>>): Prisma__RecentActivityClient<$Result.GetResult<Prisma.$RecentActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RecentActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityCountArgs} args - Arguments to filter RecentActivities to count.
     * @example
     * // Count the number of RecentActivities
     * const count = await prisma.recentActivity.count({
     *   where: {
     *     // ... the filter for the RecentActivities we want to count
     *   }
     * })
    **/
    count<T extends RecentActivityCountArgs>(
      args?: Subset<T, RecentActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecentActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecentActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecentActivityAggregateArgs>(args: Subset<T, RecentActivityAggregateArgs>): Prisma.PrismaPromise<GetRecentActivityAggregateType<T>>

    /**
     * Group by RecentActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecentActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecentActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecentActivityGroupByArgs['orderBy'] }
        : { orderBy?: RecentActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecentActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecentActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecentActivity model
   */
  readonly fields: RecentActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecentActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecentActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecentActivity model
   */
  interface RecentActivityFieldRefs {
    readonly id: FieldRef<"RecentActivity", 'String'>
    readonly user_id: FieldRef<"RecentActivity", 'String'>
    readonly activity: FieldRef<"RecentActivity", 'String'>
    readonly description: FieldRef<"RecentActivity", 'String'>
    readonly xp_earned: FieldRef<"RecentActivity", 'Int'>
    readonly created_at: FieldRef<"RecentActivity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RecentActivity findUnique
   */
  export type RecentActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter, which RecentActivity to fetch.
     */
    where: RecentActivityWhereUniqueInput
  }

  /**
   * RecentActivity findUniqueOrThrow
   */
  export type RecentActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter, which RecentActivity to fetch.
     */
    where: RecentActivityWhereUniqueInput
  }

  /**
   * RecentActivity findFirst
   */
  export type RecentActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter, which RecentActivity to fetch.
     */
    where?: RecentActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecentActivities to fetch.
     */
    orderBy?: RecentActivityOrderByWithRelationInput | RecentActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecentActivities.
     */
    cursor?: RecentActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecentActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecentActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecentActivities.
     */
    distinct?: RecentActivityScalarFieldEnum | RecentActivityScalarFieldEnum[]
  }

  /**
   * RecentActivity findFirstOrThrow
   */
  export type RecentActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter, which RecentActivity to fetch.
     */
    where?: RecentActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecentActivities to fetch.
     */
    orderBy?: RecentActivityOrderByWithRelationInput | RecentActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecentActivities.
     */
    cursor?: RecentActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecentActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecentActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecentActivities.
     */
    distinct?: RecentActivityScalarFieldEnum | RecentActivityScalarFieldEnum[]
  }

  /**
   * RecentActivity findMany
   */
  export type RecentActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter, which RecentActivities to fetch.
     */
    where?: RecentActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecentActivities to fetch.
     */
    orderBy?: RecentActivityOrderByWithRelationInput | RecentActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecentActivities.
     */
    cursor?: RecentActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecentActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecentActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecentActivities.
     */
    distinct?: RecentActivityScalarFieldEnum | RecentActivityScalarFieldEnum[]
  }

  /**
   * RecentActivity create
   */
  export type RecentActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a RecentActivity.
     */
    data: XOR<RecentActivityCreateInput, RecentActivityUncheckedCreateInput>
  }

  /**
   * RecentActivity createMany
   */
  export type RecentActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecentActivities.
     */
    data: RecentActivityCreateManyInput | RecentActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecentActivity createManyAndReturn
   */
  export type RecentActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * The data used to create many RecentActivities.
     */
    data: RecentActivityCreateManyInput | RecentActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecentActivity update
   */
  export type RecentActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a RecentActivity.
     */
    data: XOR<RecentActivityUpdateInput, RecentActivityUncheckedUpdateInput>
    /**
     * Choose, which RecentActivity to update.
     */
    where: RecentActivityWhereUniqueInput
  }

  /**
   * RecentActivity updateMany
   */
  export type RecentActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecentActivities.
     */
    data: XOR<RecentActivityUpdateManyMutationInput, RecentActivityUncheckedUpdateManyInput>
    /**
     * Filter which RecentActivities to update
     */
    where?: RecentActivityWhereInput
    /**
     * Limit how many RecentActivities to update.
     */
    limit?: number
  }

  /**
   * RecentActivity updateManyAndReturn
   */
  export type RecentActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * The data used to update RecentActivities.
     */
    data: XOR<RecentActivityUpdateManyMutationInput, RecentActivityUncheckedUpdateManyInput>
    /**
     * Filter which RecentActivities to update
     */
    where?: RecentActivityWhereInput
    /**
     * Limit how many RecentActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecentActivity upsert
   */
  export type RecentActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the RecentActivity to update in case it exists.
     */
    where: RecentActivityWhereUniqueInput
    /**
     * In case the RecentActivity found by the `where` argument doesn't exist, create a new RecentActivity with this data.
     */
    create: XOR<RecentActivityCreateInput, RecentActivityUncheckedCreateInput>
    /**
     * In case the RecentActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecentActivityUpdateInput, RecentActivityUncheckedUpdateInput>
  }

  /**
   * RecentActivity delete
   */
  export type RecentActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
    /**
     * Filter which RecentActivity to delete.
     */
    where: RecentActivityWhereUniqueInput
  }

  /**
   * RecentActivity deleteMany
   */
  export type RecentActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecentActivities to delete
     */
    where?: RecentActivityWhereInput
    /**
     * Limit how many RecentActivities to delete.
     */
    limit?: number
  }

  /**
   * RecentActivity without action
   */
  export type RecentActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecentActivity
     */
    select?: RecentActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RecentActivity
     */
    omit?: RecentActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecentActivityInclude<ExtArgs> | null
  }


  /**
   * Model LeaderboardEntry
   */

  export type AggregateLeaderboardEntry = {
    _count: LeaderboardEntryCountAggregateOutputType | null
    _avg: LeaderboardEntryAvgAggregateOutputType | null
    _sum: LeaderboardEntrySumAggregateOutputType | null
    _min: LeaderboardEntryMinAggregateOutputType | null
    _max: LeaderboardEntryMaxAggregateOutputType | null
  }

  export type LeaderboardEntryAvgAggregateOutputType = {
    xp_total: number | null
    rank: number | null
  }

  export type LeaderboardEntrySumAggregateOutputType = {
    xp_total: number | null
    rank: number | null
  }

  export type LeaderboardEntryMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    name: string | null
    xp_total: number | null
    tier: $Enums.Tier | null
    rank: number | null
    city: string | null
    period: $Enums.Period | null
    computed_at: Date | null
  }

  export type LeaderboardEntryMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    name: string | null
    xp_total: number | null
    tier: $Enums.Tier | null
    rank: number | null
    city: string | null
    period: $Enums.Period | null
    computed_at: Date | null
  }

  export type LeaderboardEntryCountAggregateOutputType = {
    id: number
    user_id: number
    name: number
    xp_total: number
    tier: number
    rank: number
    city: number
    period: number
    computed_at: number
    _all: number
  }


  export type LeaderboardEntryAvgAggregateInputType = {
    xp_total?: true
    rank?: true
  }

  export type LeaderboardEntrySumAggregateInputType = {
    xp_total?: true
    rank?: true
  }

  export type LeaderboardEntryMinAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    xp_total?: true
    tier?: true
    rank?: true
    city?: true
    period?: true
    computed_at?: true
  }

  export type LeaderboardEntryMaxAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    xp_total?: true
    tier?: true
    rank?: true
    city?: true
    period?: true
    computed_at?: true
  }

  export type LeaderboardEntryCountAggregateInputType = {
    id?: true
    user_id?: true
    name?: true
    xp_total?: true
    tier?: true
    rank?: true
    city?: true
    period?: true
    computed_at?: true
    _all?: true
  }

  export type LeaderboardEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardEntry to aggregate.
     */
    where?: LeaderboardEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardEntries to fetch.
     */
    orderBy?: LeaderboardEntryOrderByWithRelationInput | LeaderboardEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaderboardEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaderboardEntries
    **/
    _count?: true | LeaderboardEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaderboardEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaderboardEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaderboardEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaderboardEntryMaxAggregateInputType
  }

  export type GetLeaderboardEntryAggregateType<T extends LeaderboardEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaderboardEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaderboardEntry[P]>
      : GetScalarType<T[P], AggregateLeaderboardEntry[P]>
  }




  export type LeaderboardEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaderboardEntryWhereInput
    orderBy?: LeaderboardEntryOrderByWithAggregationInput | LeaderboardEntryOrderByWithAggregationInput[]
    by: LeaderboardEntryScalarFieldEnum[] | LeaderboardEntryScalarFieldEnum
    having?: LeaderboardEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaderboardEntryCountAggregateInputType | true
    _avg?: LeaderboardEntryAvgAggregateInputType
    _sum?: LeaderboardEntrySumAggregateInputType
    _min?: LeaderboardEntryMinAggregateInputType
    _max?: LeaderboardEntryMaxAggregateInputType
  }

  export type LeaderboardEntryGroupByOutputType = {
    id: string
    user_id: string
    name: string
    xp_total: number
    tier: $Enums.Tier
    rank: number
    city: string | null
    period: $Enums.Period
    computed_at: Date
    _count: LeaderboardEntryCountAggregateOutputType | null
    _avg: LeaderboardEntryAvgAggregateOutputType | null
    _sum: LeaderboardEntrySumAggregateOutputType | null
    _min: LeaderboardEntryMinAggregateOutputType | null
    _max: LeaderboardEntryMaxAggregateOutputType | null
  }

  type GetLeaderboardEntryGroupByPayload<T extends LeaderboardEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaderboardEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaderboardEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaderboardEntryGroupByOutputType[P]>
            : GetScalarType<T[P], LeaderboardEntryGroupByOutputType[P]>
        }
      >
    >


  export type LeaderboardEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    xp_total?: boolean
    tier?: boolean
    rank?: boolean
    city?: boolean
    period?: boolean
    computed_at?: boolean
  }, ExtArgs["result"]["leaderboardEntry"]>

  export type LeaderboardEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    xp_total?: boolean
    tier?: boolean
    rank?: boolean
    city?: boolean
    period?: boolean
    computed_at?: boolean
  }, ExtArgs["result"]["leaderboardEntry"]>

  export type LeaderboardEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    name?: boolean
    xp_total?: boolean
    tier?: boolean
    rank?: boolean
    city?: boolean
    period?: boolean
    computed_at?: boolean
  }, ExtArgs["result"]["leaderboardEntry"]>

  export type LeaderboardEntrySelectScalar = {
    id?: boolean
    user_id?: boolean
    name?: boolean
    xp_total?: boolean
    tier?: boolean
    rank?: boolean
    city?: boolean
    period?: boolean
    computed_at?: boolean
  }

  export type LeaderboardEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "name" | "xp_total" | "tier" | "rank" | "city" | "period" | "computed_at", ExtArgs["result"]["leaderboardEntry"]>

  export type $LeaderboardEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaderboardEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      name: string
      xp_total: number
      tier: $Enums.Tier
      rank: number
      city: string | null
      period: $Enums.Period
      computed_at: Date
    }, ExtArgs["result"]["leaderboardEntry"]>
    composites: {}
  }

  type LeaderboardEntryGetPayload<S extends boolean | null | undefined | LeaderboardEntryDefaultArgs> = $Result.GetResult<Prisma.$LeaderboardEntryPayload, S>

  type LeaderboardEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaderboardEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaderboardEntryCountAggregateInputType | true
    }

  export interface LeaderboardEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaderboardEntry'], meta: { name: 'LeaderboardEntry' } }
    /**
     * Find zero or one LeaderboardEntry that matches the filter.
     * @param {LeaderboardEntryFindUniqueArgs} args - Arguments to find a LeaderboardEntry
     * @example
     * // Get one LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaderboardEntryFindUniqueArgs>(args: SelectSubset<T, LeaderboardEntryFindUniqueArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LeaderboardEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaderboardEntryFindUniqueOrThrowArgs} args - Arguments to find a LeaderboardEntry
     * @example
     * // Get one LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaderboardEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaderboardEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaderboardEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryFindFirstArgs} args - Arguments to find a LeaderboardEntry
     * @example
     * // Get one LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaderboardEntryFindFirstArgs>(args?: SelectSubset<T, LeaderboardEntryFindFirstArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LeaderboardEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryFindFirstOrThrowArgs} args - Arguments to find a LeaderboardEntry
     * @example
     * // Get one LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaderboardEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaderboardEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LeaderboardEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaderboardEntries
     * const leaderboardEntries = await prisma.leaderboardEntry.findMany()
     * 
     * // Get first 10 LeaderboardEntries
     * const leaderboardEntries = await prisma.leaderboardEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaderboardEntryWithIdOnly = await prisma.leaderboardEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaderboardEntryFindManyArgs>(args?: SelectSubset<T, LeaderboardEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LeaderboardEntry.
     * @param {LeaderboardEntryCreateArgs} args - Arguments to create a LeaderboardEntry.
     * @example
     * // Create one LeaderboardEntry
     * const LeaderboardEntry = await prisma.leaderboardEntry.create({
     *   data: {
     *     // ... data to create a LeaderboardEntry
     *   }
     * })
     * 
     */
    create<T extends LeaderboardEntryCreateArgs>(args: SelectSubset<T, LeaderboardEntryCreateArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LeaderboardEntries.
     * @param {LeaderboardEntryCreateManyArgs} args - Arguments to create many LeaderboardEntries.
     * @example
     * // Create many LeaderboardEntries
     * const leaderboardEntry = await prisma.leaderboardEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaderboardEntryCreateManyArgs>(args?: SelectSubset<T, LeaderboardEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaderboardEntries and returns the data saved in the database.
     * @param {LeaderboardEntryCreateManyAndReturnArgs} args - Arguments to create many LeaderboardEntries.
     * @example
     * // Create many LeaderboardEntries
     * const leaderboardEntry = await prisma.leaderboardEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaderboardEntries and only return the `id`
     * const leaderboardEntryWithIdOnly = await prisma.leaderboardEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaderboardEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaderboardEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LeaderboardEntry.
     * @param {LeaderboardEntryDeleteArgs} args - Arguments to delete one LeaderboardEntry.
     * @example
     * // Delete one LeaderboardEntry
     * const LeaderboardEntry = await prisma.leaderboardEntry.delete({
     *   where: {
     *     // ... filter to delete one LeaderboardEntry
     *   }
     * })
     * 
     */
    delete<T extends LeaderboardEntryDeleteArgs>(args: SelectSubset<T, LeaderboardEntryDeleteArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LeaderboardEntry.
     * @param {LeaderboardEntryUpdateArgs} args - Arguments to update one LeaderboardEntry.
     * @example
     * // Update one LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaderboardEntryUpdateArgs>(args: SelectSubset<T, LeaderboardEntryUpdateArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LeaderboardEntries.
     * @param {LeaderboardEntryDeleteManyArgs} args - Arguments to filter LeaderboardEntries to delete.
     * @example
     * // Delete a few LeaderboardEntries
     * const { count } = await prisma.leaderboardEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaderboardEntryDeleteManyArgs>(args?: SelectSubset<T, LeaderboardEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaderboardEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaderboardEntries
     * const leaderboardEntry = await prisma.leaderboardEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaderboardEntryUpdateManyArgs>(args: SelectSubset<T, LeaderboardEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaderboardEntries and returns the data updated in the database.
     * @param {LeaderboardEntryUpdateManyAndReturnArgs} args - Arguments to update many LeaderboardEntries.
     * @example
     * // Update many LeaderboardEntries
     * const leaderboardEntry = await prisma.leaderboardEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LeaderboardEntries and only return the `id`
     * const leaderboardEntryWithIdOnly = await prisma.leaderboardEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeaderboardEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaderboardEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LeaderboardEntry.
     * @param {LeaderboardEntryUpsertArgs} args - Arguments to update or create a LeaderboardEntry.
     * @example
     * // Update or create a LeaderboardEntry
     * const leaderboardEntry = await prisma.leaderboardEntry.upsert({
     *   create: {
     *     // ... data to create a LeaderboardEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaderboardEntry we want to update
     *   }
     * })
     */
    upsert<T extends LeaderboardEntryUpsertArgs>(args: SelectSubset<T, LeaderboardEntryUpsertArgs<ExtArgs>>): Prisma__LeaderboardEntryClient<$Result.GetResult<Prisma.$LeaderboardEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LeaderboardEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryCountArgs} args - Arguments to filter LeaderboardEntries to count.
     * @example
     * // Count the number of LeaderboardEntries
     * const count = await prisma.leaderboardEntry.count({
     *   where: {
     *     // ... the filter for the LeaderboardEntries we want to count
     *   }
     * })
    **/
    count<T extends LeaderboardEntryCountArgs>(
      args?: Subset<T, LeaderboardEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaderboardEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaderboardEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaderboardEntryAggregateArgs>(args: Subset<T, LeaderboardEntryAggregateArgs>): Prisma.PrismaPromise<GetLeaderboardEntryAggregateType<T>>

    /**
     * Group by LeaderboardEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaderboardEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaderboardEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaderboardEntryGroupByArgs['orderBy'] }
        : { orderBy?: LeaderboardEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaderboardEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaderboardEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaderboardEntry model
   */
  readonly fields: LeaderboardEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaderboardEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaderboardEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaderboardEntry model
   */
  interface LeaderboardEntryFieldRefs {
    readonly id: FieldRef<"LeaderboardEntry", 'String'>
    readonly user_id: FieldRef<"LeaderboardEntry", 'String'>
    readonly name: FieldRef<"LeaderboardEntry", 'String'>
    readonly xp_total: FieldRef<"LeaderboardEntry", 'Int'>
    readonly tier: FieldRef<"LeaderboardEntry", 'Tier'>
    readonly rank: FieldRef<"LeaderboardEntry", 'Int'>
    readonly city: FieldRef<"LeaderboardEntry", 'String'>
    readonly period: FieldRef<"LeaderboardEntry", 'Period'>
    readonly computed_at: FieldRef<"LeaderboardEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaderboardEntry findUnique
   */
  export type LeaderboardEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter, which LeaderboardEntry to fetch.
     */
    where: LeaderboardEntryWhereUniqueInput
  }

  /**
   * LeaderboardEntry findUniqueOrThrow
   */
  export type LeaderboardEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter, which LeaderboardEntry to fetch.
     */
    where: LeaderboardEntryWhereUniqueInput
  }

  /**
   * LeaderboardEntry findFirst
   */
  export type LeaderboardEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter, which LeaderboardEntry to fetch.
     */
    where?: LeaderboardEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardEntries to fetch.
     */
    orderBy?: LeaderboardEntryOrderByWithRelationInput | LeaderboardEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardEntries.
     */
    cursor?: LeaderboardEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardEntries.
     */
    distinct?: LeaderboardEntryScalarFieldEnum | LeaderboardEntryScalarFieldEnum[]
  }

  /**
   * LeaderboardEntry findFirstOrThrow
   */
  export type LeaderboardEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter, which LeaderboardEntry to fetch.
     */
    where?: LeaderboardEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardEntries to fetch.
     */
    orderBy?: LeaderboardEntryOrderByWithRelationInput | LeaderboardEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaderboardEntries.
     */
    cursor?: LeaderboardEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardEntries.
     */
    distinct?: LeaderboardEntryScalarFieldEnum | LeaderboardEntryScalarFieldEnum[]
  }

  /**
   * LeaderboardEntry findMany
   */
  export type LeaderboardEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter, which LeaderboardEntries to fetch.
     */
    where?: LeaderboardEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaderboardEntries to fetch.
     */
    orderBy?: LeaderboardEntryOrderByWithRelationInput | LeaderboardEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaderboardEntries.
     */
    cursor?: LeaderboardEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaderboardEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaderboardEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaderboardEntries.
     */
    distinct?: LeaderboardEntryScalarFieldEnum | LeaderboardEntryScalarFieldEnum[]
  }

  /**
   * LeaderboardEntry create
   */
  export type LeaderboardEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a LeaderboardEntry.
     */
    data: XOR<LeaderboardEntryCreateInput, LeaderboardEntryUncheckedCreateInput>
  }

  /**
   * LeaderboardEntry createMany
   */
  export type LeaderboardEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaderboardEntries.
     */
    data: LeaderboardEntryCreateManyInput | LeaderboardEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaderboardEntry createManyAndReturn
   */
  export type LeaderboardEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * The data used to create many LeaderboardEntries.
     */
    data: LeaderboardEntryCreateManyInput | LeaderboardEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaderboardEntry update
   */
  export type LeaderboardEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a LeaderboardEntry.
     */
    data: XOR<LeaderboardEntryUpdateInput, LeaderboardEntryUncheckedUpdateInput>
    /**
     * Choose, which LeaderboardEntry to update.
     */
    where: LeaderboardEntryWhereUniqueInput
  }

  /**
   * LeaderboardEntry updateMany
   */
  export type LeaderboardEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaderboardEntries.
     */
    data: XOR<LeaderboardEntryUpdateManyMutationInput, LeaderboardEntryUncheckedUpdateManyInput>
    /**
     * Filter which LeaderboardEntries to update
     */
    where?: LeaderboardEntryWhereInput
    /**
     * Limit how many LeaderboardEntries to update.
     */
    limit?: number
  }

  /**
   * LeaderboardEntry updateManyAndReturn
   */
  export type LeaderboardEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * The data used to update LeaderboardEntries.
     */
    data: XOR<LeaderboardEntryUpdateManyMutationInput, LeaderboardEntryUncheckedUpdateManyInput>
    /**
     * Filter which LeaderboardEntries to update
     */
    where?: LeaderboardEntryWhereInput
    /**
     * Limit how many LeaderboardEntries to update.
     */
    limit?: number
  }

  /**
   * LeaderboardEntry upsert
   */
  export type LeaderboardEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the LeaderboardEntry to update in case it exists.
     */
    where: LeaderboardEntryWhereUniqueInput
    /**
     * In case the LeaderboardEntry found by the `where` argument doesn't exist, create a new LeaderboardEntry with this data.
     */
    create: XOR<LeaderboardEntryCreateInput, LeaderboardEntryUncheckedCreateInput>
    /**
     * In case the LeaderboardEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaderboardEntryUpdateInput, LeaderboardEntryUncheckedUpdateInput>
  }

  /**
   * LeaderboardEntry delete
   */
  export type LeaderboardEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
    /**
     * Filter which LeaderboardEntry to delete.
     */
    where: LeaderboardEntryWhereUniqueInput
  }

  /**
   * LeaderboardEntry deleteMany
   */
  export type LeaderboardEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaderboardEntries to delete
     */
    where?: LeaderboardEntryWhereInput
    /**
     * Limit how many LeaderboardEntries to delete.
     */
    limit?: number
  }

  /**
   * LeaderboardEntry without action
   */
  export type LeaderboardEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaderboardEntry
     */
    select?: LeaderboardEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LeaderboardEntry
     */
    omit?: LeaderboardEntryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fan_id: 'fan_id',
    email: 'email',
    name: 'name',
    avatar_initials: 'avatar_initials',
    city: 'city',
    member_since: 'member_since',
    created_at: 'created_at',
    updated_at: 'updated_at',
    xp_total: 'xp_total',
    current_tier: 'current_tier',
    streak_days: 'streak_days',
    rank: 'rank',
    percentile: 'percentile',
    top_artist: 'top_artist',
    top_venue: 'top_venue',
    events_attended: 'events_attended',
    spotify_id: 'spotify_id',
    apple_music_id: 'apple_music_id',
    discord_id: 'discord_id',
    lastfm_username: 'lastfm_username'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    event_id: 'event_id',
    title: 'title',
    subtitle: 'subtitle',
    artist: 'artist',
    venue: 'venue',
    city: 'city',
    date: 'date',
    category: 'category',
    image_url: 'image_url',
    status: 'status',
    trending: 'trending',
    featured: 'featured',
    created_at: 'created_at'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const UserEventScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    event_id: 'event_id',
    bookmarked: 'bookmarked',
    notify_me: 'notify_me',
    attended: 'attended',
    created_at: 'created_at'
  };

  export type UserEventScalarFieldEnum = (typeof UserEventScalarFieldEnum)[keyof typeof UserEventScalarFieldEnum]


  export const ChallengeScalarFieldEnum: {
    id: 'id',
    challenge_id: 'challenge_id',
    title: 'title',
    description: 'description',
    category: 'category',
    xp_reward: 'xp_reward',
    difficulty: 'difficulty',
    tasks: 'tasks',
    progress_target: 'progress_target',
    active: 'active',
    created_at: 'created_at'
  };

  export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum]


  export const UserChallengeScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    challenge_id: 'challenge_id',
    completed: 'completed',
    progress: 'progress',
    tasks_completed: 'tasks_completed',
    completed_at: 'completed_at',
    created_at: 'created_at'
  };

  export type UserChallengeScalarFieldEnum = (typeof UserChallengeScalarFieldEnum)[keyof typeof UserChallengeScalarFieldEnum]


  export const XpTransactionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    amount: 'amount',
    source: 'source',
    reference: 'reference',
    description: 'description',
    created_at: 'created_at'
  };

  export type XpTransactionScalarFieldEnum = (typeof XpTransactionScalarFieldEnum)[keyof typeof XpTransactionScalarFieldEnum]


  export const PassScalarFieldEnum: {
    id: 'id',
    pass_id: 'pass_id',
    user_id: 'user_id',
    title: 'title',
    description: 'description',
    tier: 'tier',
    status: 'status',
    valid_until: 'valid_until',
    created_at: 'created_at',
    claimed_at: 'claimed_at'
  };

  export type PassScalarFieldEnum = (typeof PassScalarFieldEnum)[keyof typeof PassScalarFieldEnum]


  export const FriendActivityScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    friend_name: 'friend_name',
    activity: 'activity',
    xp_change: 'xp_change',
    created_at: 'created_at'
  };

  export type FriendActivityScalarFieldEnum = (typeof FriendActivityScalarFieldEnum)[keyof typeof FriendActivityScalarFieldEnum]


  export const RecentActivityScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    activity: 'activity',
    description: 'description',
    xp_earned: 'xp_earned',
    created_at: 'created_at'
  };

  export type RecentActivityScalarFieldEnum = (typeof RecentActivityScalarFieldEnum)[keyof typeof RecentActivityScalarFieldEnum]


  export const LeaderboardEntryScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    name: 'name',
    xp_total: 'xp_total',
    tier: 'tier',
    rank: 'rank',
    city: 'city',
    period: 'period',
    computed_at: 'computed_at'
  };

  export type LeaderboardEntryScalarFieldEnum = (typeof LeaderboardEntryScalarFieldEnum)[keyof typeof LeaderboardEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Tier'
   */
  export type EnumTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tier'>
    


  /**
   * Reference to a field of type 'Tier[]'
   */
  export type ListEnumTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tier[]'>
    


  /**
   * Reference to a field of type 'EventCategory'
   */
  export type EnumEventCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventCategory'>
    


  /**
   * Reference to a field of type 'EventCategory[]'
   */
  export type ListEnumEventCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventCategory[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'PassStatus'
   */
  export type EnumPassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PassStatus'>
    


  /**
   * Reference to a field of type 'PassStatus[]'
   */
  export type ListEnumPassStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PassStatus[]'>
    


  /**
   * Reference to a field of type 'Period'
   */
  export type EnumPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Period'>
    


  /**
   * Reference to a field of type 'Period[]'
   */
  export type ListEnumPeriodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Period[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fan_id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    name?: StringFilter<"User"> | string
    avatar_initials?: StringFilter<"User"> | string
    city?: StringFilter<"User"> | string
    member_since?: DateTimeFilter<"User"> | Date | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    xp_total?: IntFilter<"User"> | number
    current_tier?: EnumTierFilter<"User"> | $Enums.Tier
    streak_days?: IntFilter<"User"> | number
    rank?: IntNullableFilter<"User"> | number | null
    percentile?: IntNullableFilter<"User"> | number | null
    top_artist?: StringNullableFilter<"User"> | string | null
    top_venue?: StringNullableFilter<"User"> | string | null
    events_attended?: IntFilter<"User"> | number
    spotify_id?: StringNullableFilter<"User"> | string | null
    apple_music_id?: StringNullableFilter<"User"> | string | null
    discord_id?: StringNullableFilter<"User"> | string | null
    lastfm_username?: StringNullableFilter<"User"> | string | null
    event_interactions?: UserEventListRelationFilter
    challenge_progress?: UserChallengeListRelationFilter
    xp_transactions?: XpTransactionListRelationFilter
    friend_activities?: FriendActivityListRelationFilter
    recent_activities?: RecentActivityListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fan_id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar_initials?: SortOrder
    city?: SortOrder
    member_since?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    xp_total?: SortOrder
    current_tier?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrderInput | SortOrder
    percentile?: SortOrderInput | SortOrder
    top_artist?: SortOrderInput | SortOrder
    top_venue?: SortOrderInput | SortOrder
    events_attended?: SortOrder
    spotify_id?: SortOrderInput | SortOrder
    apple_music_id?: SortOrderInput | SortOrder
    discord_id?: SortOrderInput | SortOrder
    lastfm_username?: SortOrderInput | SortOrder
    event_interactions?: UserEventOrderByRelationAggregateInput
    challenge_progress?: UserChallengeOrderByRelationAggregateInput
    xp_transactions?: XpTransactionOrderByRelationAggregateInput
    friend_activities?: FriendActivityOrderByRelationAggregateInput
    recent_activities?: RecentActivityOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fan_id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    avatar_initials?: StringFilter<"User"> | string
    city?: StringFilter<"User"> | string
    member_since?: DateTimeFilter<"User"> | Date | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    xp_total?: IntFilter<"User"> | number
    current_tier?: EnumTierFilter<"User"> | $Enums.Tier
    streak_days?: IntFilter<"User"> | number
    rank?: IntNullableFilter<"User"> | number | null
    percentile?: IntNullableFilter<"User"> | number | null
    top_artist?: StringNullableFilter<"User"> | string | null
    top_venue?: StringNullableFilter<"User"> | string | null
    events_attended?: IntFilter<"User"> | number
    spotify_id?: StringNullableFilter<"User"> | string | null
    apple_music_id?: StringNullableFilter<"User"> | string | null
    discord_id?: StringNullableFilter<"User"> | string | null
    lastfm_username?: StringNullableFilter<"User"> | string | null
    event_interactions?: UserEventListRelationFilter
    challenge_progress?: UserChallengeListRelationFilter
    xp_transactions?: XpTransactionListRelationFilter
    friend_activities?: FriendActivityListRelationFilter
    recent_activities?: RecentActivityListRelationFilter
  }, "id" | "fan_id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fan_id?: SortOrder
    email?: SortOrderInput | SortOrder
    name?: SortOrder
    avatar_initials?: SortOrder
    city?: SortOrder
    member_since?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    xp_total?: SortOrder
    current_tier?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrderInput | SortOrder
    percentile?: SortOrderInput | SortOrder
    top_artist?: SortOrderInput | SortOrder
    top_venue?: SortOrderInput | SortOrder
    events_attended?: SortOrder
    spotify_id?: SortOrderInput | SortOrder
    apple_music_id?: SortOrderInput | SortOrder
    discord_id?: SortOrderInput | SortOrder
    lastfm_username?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fan_id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    name?: StringWithAggregatesFilter<"User"> | string
    avatar_initials?: StringWithAggregatesFilter<"User"> | string
    city?: StringWithAggregatesFilter<"User"> | string
    member_since?: DateTimeWithAggregatesFilter<"User"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    xp_total?: IntWithAggregatesFilter<"User"> | number
    current_tier?: EnumTierWithAggregatesFilter<"User"> | $Enums.Tier
    streak_days?: IntWithAggregatesFilter<"User"> | number
    rank?: IntNullableWithAggregatesFilter<"User"> | number | null
    percentile?: IntNullableWithAggregatesFilter<"User"> | number | null
    top_artist?: StringNullableWithAggregatesFilter<"User"> | string | null
    top_venue?: StringNullableWithAggregatesFilter<"User"> | string | null
    events_attended?: IntWithAggregatesFilter<"User"> | number
    spotify_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    apple_music_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    discord_id?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastfm_username?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    event_id?: StringFilter<"Event"> | string
    title?: StringFilter<"Event"> | string
    subtitle?: StringNullableFilter<"Event"> | string | null
    artist?: StringNullableFilter<"Event"> | string | null
    venue?: StringFilter<"Event"> | string
    city?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    category?: EnumEventCategoryFilter<"Event"> | $Enums.EventCategory
    image_url?: StringNullableFilter<"Event"> | string | null
    status?: StringNullableFilter<"Event"> | string | null
    trending?: BoolFilter<"Event"> | boolean
    featured?: BoolFilter<"Event"> | boolean
    created_at?: DateTimeFilter<"Event"> | Date | string
    user_events?: UserEventListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    event_id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    artist?: SortOrderInput | SortOrder
    venue?: SortOrder
    city?: SortOrder
    date?: SortOrder
    category?: SortOrder
    image_url?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    trending?: SortOrder
    featured?: SortOrder
    created_at?: SortOrder
    user_events?: UserEventOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    event_id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    title?: StringFilter<"Event"> | string
    subtitle?: StringNullableFilter<"Event"> | string | null
    artist?: StringNullableFilter<"Event"> | string | null
    venue?: StringFilter<"Event"> | string
    city?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    category?: EnumEventCategoryFilter<"Event"> | $Enums.EventCategory
    image_url?: StringNullableFilter<"Event"> | string | null
    status?: StringNullableFilter<"Event"> | string | null
    trending?: BoolFilter<"Event"> | boolean
    featured?: BoolFilter<"Event"> | boolean
    created_at?: DateTimeFilter<"Event"> | Date | string
    user_events?: UserEventListRelationFilter
  }, "id" | "event_id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    event_id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrderInput | SortOrder
    artist?: SortOrderInput | SortOrder
    venue?: SortOrder
    city?: SortOrder
    date?: SortOrder
    category?: SortOrder
    image_url?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    trending?: SortOrder
    featured?: SortOrder
    created_at?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    event_id?: StringWithAggregatesFilter<"Event"> | string
    title?: StringWithAggregatesFilter<"Event"> | string
    subtitle?: StringNullableWithAggregatesFilter<"Event"> | string | null
    artist?: StringNullableWithAggregatesFilter<"Event"> | string | null
    venue?: StringWithAggregatesFilter<"Event"> | string
    city?: StringWithAggregatesFilter<"Event"> | string
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    category?: EnumEventCategoryWithAggregatesFilter<"Event"> | $Enums.EventCategory
    image_url?: StringNullableWithAggregatesFilter<"Event"> | string | null
    status?: StringNullableWithAggregatesFilter<"Event"> | string | null
    trending?: BoolWithAggregatesFilter<"Event"> | boolean
    featured?: BoolWithAggregatesFilter<"Event"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type UserEventWhereInput = {
    AND?: UserEventWhereInput | UserEventWhereInput[]
    OR?: UserEventWhereInput[]
    NOT?: UserEventWhereInput | UserEventWhereInput[]
    id?: StringFilter<"UserEvent"> | string
    user_id?: StringFilter<"UserEvent"> | string
    event_id?: StringFilter<"UserEvent"> | string
    bookmarked?: BoolFilter<"UserEvent"> | boolean
    notify_me?: BoolFilter<"UserEvent"> | boolean
    attended?: BoolFilter<"UserEvent"> | boolean
    created_at?: DateTimeFilter<"UserEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }

  export type UserEventOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    bookmarked?: SortOrder
    notify_me?: SortOrder
    attended?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type UserEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_event_id?: UserEventUser_idEvent_idCompoundUniqueInput
    AND?: UserEventWhereInput | UserEventWhereInput[]
    OR?: UserEventWhereInput[]
    NOT?: UserEventWhereInput | UserEventWhereInput[]
    user_id?: StringFilter<"UserEvent"> | string
    event_id?: StringFilter<"UserEvent"> | string
    bookmarked?: BoolFilter<"UserEvent"> | boolean
    notify_me?: BoolFilter<"UserEvent"> | boolean
    attended?: BoolFilter<"UserEvent"> | boolean
    created_at?: DateTimeFilter<"UserEvent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
  }, "id" | "user_id_event_id">

  export type UserEventOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    bookmarked?: SortOrder
    notify_me?: SortOrder
    attended?: SortOrder
    created_at?: SortOrder
    _count?: UserEventCountOrderByAggregateInput
    _max?: UserEventMaxOrderByAggregateInput
    _min?: UserEventMinOrderByAggregateInput
  }

  export type UserEventScalarWhereWithAggregatesInput = {
    AND?: UserEventScalarWhereWithAggregatesInput | UserEventScalarWhereWithAggregatesInput[]
    OR?: UserEventScalarWhereWithAggregatesInput[]
    NOT?: UserEventScalarWhereWithAggregatesInput | UserEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserEvent"> | string
    user_id?: StringWithAggregatesFilter<"UserEvent"> | string
    event_id?: StringWithAggregatesFilter<"UserEvent"> | string
    bookmarked?: BoolWithAggregatesFilter<"UserEvent"> | boolean
    notify_me?: BoolWithAggregatesFilter<"UserEvent"> | boolean
    attended?: BoolWithAggregatesFilter<"UserEvent"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"UserEvent"> | Date | string
  }

  export type ChallengeWhereInput = {
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    id?: StringFilter<"Challenge"> | string
    challenge_id?: StringFilter<"Challenge"> | string
    title?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    category?: StringFilter<"Challenge"> | string
    xp_reward?: IntFilter<"Challenge"> | number
    difficulty?: StringFilter<"Challenge"> | string
    tasks?: JsonFilter<"Challenge">
    progress_target?: IntFilter<"Challenge"> | number
    active?: BoolFilter<"Challenge"> | boolean
    created_at?: DateTimeFilter<"Challenge"> | Date | string
    user_challenges?: UserChallengeListRelationFilter
  }

  export type ChallengeOrderByWithRelationInput = {
    id?: SortOrder
    challenge_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    xp_reward?: SortOrder
    difficulty?: SortOrder
    tasks?: SortOrder
    progress_target?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    user_challenges?: UserChallengeOrderByRelationAggregateInput
  }

  export type ChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    challenge_id?: string
    AND?: ChallengeWhereInput | ChallengeWhereInput[]
    OR?: ChallengeWhereInput[]
    NOT?: ChallengeWhereInput | ChallengeWhereInput[]
    title?: StringFilter<"Challenge"> | string
    description?: StringNullableFilter<"Challenge"> | string | null
    category?: StringFilter<"Challenge"> | string
    xp_reward?: IntFilter<"Challenge"> | number
    difficulty?: StringFilter<"Challenge"> | string
    tasks?: JsonFilter<"Challenge">
    progress_target?: IntFilter<"Challenge"> | number
    active?: BoolFilter<"Challenge"> | boolean
    created_at?: DateTimeFilter<"Challenge"> | Date | string
    user_challenges?: UserChallengeListRelationFilter
  }, "id" | "challenge_id">

  export type ChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    challenge_id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    category?: SortOrder
    xp_reward?: SortOrder
    difficulty?: SortOrder
    tasks?: SortOrder
    progress_target?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
    _count?: ChallengeCountOrderByAggregateInput
    _avg?: ChallengeAvgOrderByAggregateInput
    _max?: ChallengeMaxOrderByAggregateInput
    _min?: ChallengeMinOrderByAggregateInput
    _sum?: ChallengeSumOrderByAggregateInput
  }

  export type ChallengeScalarWhereWithAggregatesInput = {
    AND?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    OR?: ChallengeScalarWhereWithAggregatesInput[]
    NOT?: ChallengeScalarWhereWithAggregatesInput | ChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Challenge"> | string
    challenge_id?: StringWithAggregatesFilter<"Challenge"> | string
    title?: StringWithAggregatesFilter<"Challenge"> | string
    description?: StringNullableWithAggregatesFilter<"Challenge"> | string | null
    category?: StringWithAggregatesFilter<"Challenge"> | string
    xp_reward?: IntWithAggregatesFilter<"Challenge"> | number
    difficulty?: StringWithAggregatesFilter<"Challenge"> | string
    tasks?: JsonWithAggregatesFilter<"Challenge">
    progress_target?: IntWithAggregatesFilter<"Challenge"> | number
    active?: BoolWithAggregatesFilter<"Challenge"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Challenge"> | Date | string
  }

  export type UserChallengeWhereInput = {
    AND?: UserChallengeWhereInput | UserChallengeWhereInput[]
    OR?: UserChallengeWhereInput[]
    NOT?: UserChallengeWhereInput | UserChallengeWhereInput[]
    id?: StringFilter<"UserChallenge"> | string
    user_id?: StringFilter<"UserChallenge"> | string
    challenge_id?: StringFilter<"UserChallenge"> | string
    completed?: BoolFilter<"UserChallenge"> | boolean
    progress?: IntFilter<"UserChallenge"> | number
    tasks_completed?: JsonFilter<"UserChallenge">
    completed_at?: DateTimeNullableFilter<"UserChallenge"> | Date | string | null
    created_at?: DateTimeFilter<"UserChallenge"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
  }

  export type UserChallengeOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    challenge_id?: SortOrder
    completed?: SortOrder
    progress?: SortOrder
    tasks_completed?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    challenge?: ChallengeOrderByWithRelationInput
  }

  export type UserChallengeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_challenge_id?: UserChallengeUser_idChallenge_idCompoundUniqueInput
    AND?: UserChallengeWhereInput | UserChallengeWhereInput[]
    OR?: UserChallengeWhereInput[]
    NOT?: UserChallengeWhereInput | UserChallengeWhereInput[]
    user_id?: StringFilter<"UserChallenge"> | string
    challenge_id?: StringFilter<"UserChallenge"> | string
    completed?: BoolFilter<"UserChallenge"> | boolean
    progress?: IntFilter<"UserChallenge"> | number
    tasks_completed?: JsonFilter<"UserChallenge">
    completed_at?: DateTimeNullableFilter<"UserChallenge"> | Date | string | null
    created_at?: DateTimeFilter<"UserChallenge"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    challenge?: XOR<ChallengeScalarRelationFilter, ChallengeWhereInput>
  }, "id" | "user_id_challenge_id">

  export type UserChallengeOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    challenge_id?: SortOrder
    completed?: SortOrder
    progress?: SortOrder
    tasks_completed?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: UserChallengeCountOrderByAggregateInput
    _avg?: UserChallengeAvgOrderByAggregateInput
    _max?: UserChallengeMaxOrderByAggregateInput
    _min?: UserChallengeMinOrderByAggregateInput
    _sum?: UserChallengeSumOrderByAggregateInput
  }

  export type UserChallengeScalarWhereWithAggregatesInput = {
    AND?: UserChallengeScalarWhereWithAggregatesInput | UserChallengeScalarWhereWithAggregatesInput[]
    OR?: UserChallengeScalarWhereWithAggregatesInput[]
    NOT?: UserChallengeScalarWhereWithAggregatesInput | UserChallengeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserChallenge"> | string
    user_id?: StringWithAggregatesFilter<"UserChallenge"> | string
    challenge_id?: StringWithAggregatesFilter<"UserChallenge"> | string
    completed?: BoolWithAggregatesFilter<"UserChallenge"> | boolean
    progress?: IntWithAggregatesFilter<"UserChallenge"> | number
    tasks_completed?: JsonWithAggregatesFilter<"UserChallenge">
    completed_at?: DateTimeNullableWithAggregatesFilter<"UserChallenge"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"UserChallenge"> | Date | string
  }

  export type XpTransactionWhereInput = {
    AND?: XpTransactionWhereInput | XpTransactionWhereInput[]
    OR?: XpTransactionWhereInput[]
    NOT?: XpTransactionWhereInput | XpTransactionWhereInput[]
    id?: StringFilter<"XpTransaction"> | string
    user_id?: StringFilter<"XpTransaction"> | string
    amount?: IntFilter<"XpTransaction"> | number
    source?: StringFilter<"XpTransaction"> | string
    reference?: StringNullableFilter<"XpTransaction"> | string | null
    description?: StringNullableFilter<"XpTransaction"> | string | null
    created_at?: DateTimeFilter<"XpTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type XpTransactionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    source?: SortOrder
    reference?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type XpTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: XpTransactionWhereInput | XpTransactionWhereInput[]
    OR?: XpTransactionWhereInput[]
    NOT?: XpTransactionWhereInput | XpTransactionWhereInput[]
    user_id?: StringFilter<"XpTransaction"> | string
    amount?: IntFilter<"XpTransaction"> | number
    source?: StringFilter<"XpTransaction"> | string
    reference?: StringNullableFilter<"XpTransaction"> | string | null
    description?: StringNullableFilter<"XpTransaction"> | string | null
    created_at?: DateTimeFilter<"XpTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type XpTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    source?: SortOrder
    reference?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: XpTransactionCountOrderByAggregateInput
    _avg?: XpTransactionAvgOrderByAggregateInput
    _max?: XpTransactionMaxOrderByAggregateInput
    _min?: XpTransactionMinOrderByAggregateInput
    _sum?: XpTransactionSumOrderByAggregateInput
  }

  export type XpTransactionScalarWhereWithAggregatesInput = {
    AND?: XpTransactionScalarWhereWithAggregatesInput | XpTransactionScalarWhereWithAggregatesInput[]
    OR?: XpTransactionScalarWhereWithAggregatesInput[]
    NOT?: XpTransactionScalarWhereWithAggregatesInput | XpTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"XpTransaction"> | string
    user_id?: StringWithAggregatesFilter<"XpTransaction"> | string
    amount?: IntWithAggregatesFilter<"XpTransaction"> | number
    source?: StringWithAggregatesFilter<"XpTransaction"> | string
    reference?: StringNullableWithAggregatesFilter<"XpTransaction"> | string | null
    description?: StringNullableWithAggregatesFilter<"XpTransaction"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"XpTransaction"> | Date | string
  }

  export type PassWhereInput = {
    AND?: PassWhereInput | PassWhereInput[]
    OR?: PassWhereInput[]
    NOT?: PassWhereInput | PassWhereInput[]
    id?: StringFilter<"Pass"> | string
    pass_id?: StringFilter<"Pass"> | string
    user_id?: StringNullableFilter<"Pass"> | string | null
    title?: StringFilter<"Pass"> | string
    description?: StringNullableFilter<"Pass"> | string | null
    tier?: EnumTierFilter<"Pass"> | $Enums.Tier
    status?: EnumPassStatusFilter<"Pass"> | $Enums.PassStatus
    valid_until?: DateTimeNullableFilter<"Pass"> | Date | string | null
    created_at?: DateTimeFilter<"Pass"> | Date | string
    claimed_at?: DateTimeNullableFilter<"Pass"> | Date | string | null
  }

  export type PassOrderByWithRelationInput = {
    id?: SortOrder
    pass_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    tier?: SortOrder
    status?: SortOrder
    valid_until?: SortOrderInput | SortOrder
    created_at?: SortOrder
    claimed_at?: SortOrderInput | SortOrder
  }

  export type PassWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pass_id?: string
    AND?: PassWhereInput | PassWhereInput[]
    OR?: PassWhereInput[]
    NOT?: PassWhereInput | PassWhereInput[]
    user_id?: StringNullableFilter<"Pass"> | string | null
    title?: StringFilter<"Pass"> | string
    description?: StringNullableFilter<"Pass"> | string | null
    tier?: EnumTierFilter<"Pass"> | $Enums.Tier
    status?: EnumPassStatusFilter<"Pass"> | $Enums.PassStatus
    valid_until?: DateTimeNullableFilter<"Pass"> | Date | string | null
    created_at?: DateTimeFilter<"Pass"> | Date | string
    claimed_at?: DateTimeNullableFilter<"Pass"> | Date | string | null
  }, "id" | "pass_id">

  export type PassOrderByWithAggregationInput = {
    id?: SortOrder
    pass_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    tier?: SortOrder
    status?: SortOrder
    valid_until?: SortOrderInput | SortOrder
    created_at?: SortOrder
    claimed_at?: SortOrderInput | SortOrder
    _count?: PassCountOrderByAggregateInput
    _max?: PassMaxOrderByAggregateInput
    _min?: PassMinOrderByAggregateInput
  }

  export type PassScalarWhereWithAggregatesInput = {
    AND?: PassScalarWhereWithAggregatesInput | PassScalarWhereWithAggregatesInput[]
    OR?: PassScalarWhereWithAggregatesInput[]
    NOT?: PassScalarWhereWithAggregatesInput | PassScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pass"> | string
    pass_id?: StringWithAggregatesFilter<"Pass"> | string
    user_id?: StringNullableWithAggregatesFilter<"Pass"> | string | null
    title?: StringWithAggregatesFilter<"Pass"> | string
    description?: StringNullableWithAggregatesFilter<"Pass"> | string | null
    tier?: EnumTierWithAggregatesFilter<"Pass"> | $Enums.Tier
    status?: EnumPassStatusWithAggregatesFilter<"Pass"> | $Enums.PassStatus
    valid_until?: DateTimeNullableWithAggregatesFilter<"Pass"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Pass"> | Date | string
    claimed_at?: DateTimeNullableWithAggregatesFilter<"Pass"> | Date | string | null
  }

  export type FriendActivityWhereInput = {
    AND?: FriendActivityWhereInput | FriendActivityWhereInput[]
    OR?: FriendActivityWhereInput[]
    NOT?: FriendActivityWhereInput | FriendActivityWhereInput[]
    id?: StringFilter<"FriendActivity"> | string
    user_id?: StringFilter<"FriendActivity"> | string
    friend_name?: StringFilter<"FriendActivity"> | string
    activity?: StringFilter<"FriendActivity"> | string
    xp_change?: IntNullableFilter<"FriendActivity"> | number | null
    created_at?: DateTimeFilter<"FriendActivity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendActivityOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    friend_name?: SortOrder
    activity?: SortOrder
    xp_change?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FriendActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendActivityWhereInput | FriendActivityWhereInput[]
    OR?: FriendActivityWhereInput[]
    NOT?: FriendActivityWhereInput | FriendActivityWhereInput[]
    user_id?: StringFilter<"FriendActivity"> | string
    friend_name?: StringFilter<"FriendActivity"> | string
    activity?: StringFilter<"FriendActivity"> | string
    xp_change?: IntNullableFilter<"FriendActivity"> | number | null
    created_at?: DateTimeFilter<"FriendActivity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FriendActivityOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    friend_name?: SortOrder
    activity?: SortOrder
    xp_change?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: FriendActivityCountOrderByAggregateInput
    _avg?: FriendActivityAvgOrderByAggregateInput
    _max?: FriendActivityMaxOrderByAggregateInput
    _min?: FriendActivityMinOrderByAggregateInput
    _sum?: FriendActivitySumOrderByAggregateInput
  }

  export type FriendActivityScalarWhereWithAggregatesInput = {
    AND?: FriendActivityScalarWhereWithAggregatesInput | FriendActivityScalarWhereWithAggregatesInput[]
    OR?: FriendActivityScalarWhereWithAggregatesInput[]
    NOT?: FriendActivityScalarWhereWithAggregatesInput | FriendActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendActivity"> | string
    user_id?: StringWithAggregatesFilter<"FriendActivity"> | string
    friend_name?: StringWithAggregatesFilter<"FriendActivity"> | string
    activity?: StringWithAggregatesFilter<"FriendActivity"> | string
    xp_change?: IntNullableWithAggregatesFilter<"FriendActivity"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"FriendActivity"> | Date | string
  }

  export type RecentActivityWhereInput = {
    AND?: RecentActivityWhereInput | RecentActivityWhereInput[]
    OR?: RecentActivityWhereInput[]
    NOT?: RecentActivityWhereInput | RecentActivityWhereInput[]
    id?: StringFilter<"RecentActivity"> | string
    user_id?: StringFilter<"RecentActivity"> | string
    activity?: StringFilter<"RecentActivity"> | string
    description?: StringNullableFilter<"RecentActivity"> | string | null
    xp_earned?: IntFilter<"RecentActivity"> | number
    created_at?: DateTimeFilter<"RecentActivity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RecentActivityOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    activity?: SortOrder
    description?: SortOrderInput | SortOrder
    xp_earned?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RecentActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecentActivityWhereInput | RecentActivityWhereInput[]
    OR?: RecentActivityWhereInput[]
    NOT?: RecentActivityWhereInput | RecentActivityWhereInput[]
    user_id?: StringFilter<"RecentActivity"> | string
    activity?: StringFilter<"RecentActivity"> | string
    description?: StringNullableFilter<"RecentActivity"> | string | null
    xp_earned?: IntFilter<"RecentActivity"> | number
    created_at?: DateTimeFilter<"RecentActivity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RecentActivityOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    activity?: SortOrder
    description?: SortOrderInput | SortOrder
    xp_earned?: SortOrder
    created_at?: SortOrder
    _count?: RecentActivityCountOrderByAggregateInput
    _avg?: RecentActivityAvgOrderByAggregateInput
    _max?: RecentActivityMaxOrderByAggregateInput
    _min?: RecentActivityMinOrderByAggregateInput
    _sum?: RecentActivitySumOrderByAggregateInput
  }

  export type RecentActivityScalarWhereWithAggregatesInput = {
    AND?: RecentActivityScalarWhereWithAggregatesInput | RecentActivityScalarWhereWithAggregatesInput[]
    OR?: RecentActivityScalarWhereWithAggregatesInput[]
    NOT?: RecentActivityScalarWhereWithAggregatesInput | RecentActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecentActivity"> | string
    user_id?: StringWithAggregatesFilter<"RecentActivity"> | string
    activity?: StringWithAggregatesFilter<"RecentActivity"> | string
    description?: StringNullableWithAggregatesFilter<"RecentActivity"> | string | null
    xp_earned?: IntWithAggregatesFilter<"RecentActivity"> | number
    created_at?: DateTimeWithAggregatesFilter<"RecentActivity"> | Date | string
  }

  export type LeaderboardEntryWhereInput = {
    AND?: LeaderboardEntryWhereInput | LeaderboardEntryWhereInput[]
    OR?: LeaderboardEntryWhereInput[]
    NOT?: LeaderboardEntryWhereInput | LeaderboardEntryWhereInput[]
    id?: StringFilter<"LeaderboardEntry"> | string
    user_id?: StringFilter<"LeaderboardEntry"> | string
    name?: StringFilter<"LeaderboardEntry"> | string
    xp_total?: IntFilter<"LeaderboardEntry"> | number
    tier?: EnumTierFilter<"LeaderboardEntry"> | $Enums.Tier
    rank?: IntFilter<"LeaderboardEntry"> | number
    city?: StringNullableFilter<"LeaderboardEntry"> | string | null
    period?: EnumPeriodFilter<"LeaderboardEntry"> | $Enums.Period
    computed_at?: DateTimeFilter<"LeaderboardEntry"> | Date | string
  }

  export type LeaderboardEntryOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    xp_total?: SortOrder
    tier?: SortOrder
    rank?: SortOrder
    city?: SortOrderInput | SortOrder
    period?: SortOrder
    computed_at?: SortOrder
  }

  export type LeaderboardEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_period?: LeaderboardEntryUser_idPeriodCompoundUniqueInput
    AND?: LeaderboardEntryWhereInput | LeaderboardEntryWhereInput[]
    OR?: LeaderboardEntryWhereInput[]
    NOT?: LeaderboardEntryWhereInput | LeaderboardEntryWhereInput[]
    user_id?: StringFilter<"LeaderboardEntry"> | string
    name?: StringFilter<"LeaderboardEntry"> | string
    xp_total?: IntFilter<"LeaderboardEntry"> | number
    tier?: EnumTierFilter<"LeaderboardEntry"> | $Enums.Tier
    rank?: IntFilter<"LeaderboardEntry"> | number
    city?: StringNullableFilter<"LeaderboardEntry"> | string | null
    period?: EnumPeriodFilter<"LeaderboardEntry"> | $Enums.Period
    computed_at?: DateTimeFilter<"LeaderboardEntry"> | Date | string
  }, "id" | "user_id_period">

  export type LeaderboardEntryOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    xp_total?: SortOrder
    tier?: SortOrder
    rank?: SortOrder
    city?: SortOrderInput | SortOrder
    period?: SortOrder
    computed_at?: SortOrder
    _count?: LeaderboardEntryCountOrderByAggregateInput
    _avg?: LeaderboardEntryAvgOrderByAggregateInput
    _max?: LeaderboardEntryMaxOrderByAggregateInput
    _min?: LeaderboardEntryMinOrderByAggregateInput
    _sum?: LeaderboardEntrySumOrderByAggregateInput
  }

  export type LeaderboardEntryScalarWhereWithAggregatesInput = {
    AND?: LeaderboardEntryScalarWhereWithAggregatesInput | LeaderboardEntryScalarWhereWithAggregatesInput[]
    OR?: LeaderboardEntryScalarWhereWithAggregatesInput[]
    NOT?: LeaderboardEntryScalarWhereWithAggregatesInput | LeaderboardEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaderboardEntry"> | string
    user_id?: StringWithAggregatesFilter<"LeaderboardEntry"> | string
    name?: StringWithAggregatesFilter<"LeaderboardEntry"> | string
    xp_total?: IntWithAggregatesFilter<"LeaderboardEntry"> | number
    tier?: EnumTierWithAggregatesFilter<"LeaderboardEntry"> | $Enums.Tier
    rank?: IntWithAggregatesFilter<"LeaderboardEntry"> | number
    city?: StringNullableWithAggregatesFilter<"LeaderboardEntry"> | string | null
    period?: EnumPeriodWithAggregatesFilter<"LeaderboardEntry"> | $Enums.Period
    computed_at?: DateTimeWithAggregatesFilter<"LeaderboardEntry"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventUncheckedCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeUncheckedCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionUncheckedCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityUncheckedCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUncheckedUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUncheckedUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUncheckedUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateInput = {
    id?: string
    event_id: string
    title: string
    subtitle?: string | null
    artist?: string | null
    venue: string
    city: string
    date: Date | string
    category: $Enums.EventCategory
    image_url?: string | null
    status?: string | null
    trending?: boolean
    featured?: boolean
    created_at?: Date | string
    user_events?: UserEventCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    event_id: string
    title: string
    subtitle?: string | null
    artist?: string | null
    venue: string
    city: string
    date: Date | string
    category: $Enums.EventCategory
    image_url?: string | null
    status?: string | null
    trending?: boolean
    featured?: boolean
    created_at?: Date | string
    user_events?: UserEventUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_events?: UserEventUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_events?: UserEventUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    event_id: string
    title: string
    subtitle?: string | null
    artist?: string | null
    venue: string
    city: string
    date: Date | string
    category: $Enums.EventCategory
    image_url?: string | null
    status?: string | null
    trending?: boolean
    featured?: boolean
    created_at?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventCreateInput = {
    id?: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
    user: UserCreateNestedOneWithoutEvent_interactionsInput
    event: EventCreateNestedOneWithoutUser_eventsInput
  }

  export type UserEventUncheckedCreateInput = {
    id?: string
    user_id: string
    event_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEvent_interactionsNestedInput
    event?: EventUpdateOneRequiredWithoutUser_eventsNestedInput
  }

  export type UserEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventCreateManyInput = {
    id?: string
    user_id: string
    event_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeCreateInput = {
    id?: string
    challenge_id: string
    title: string
    description?: string | null
    category: string
    xp_reward: number
    difficulty?: string
    tasks: JsonNullValueInput | InputJsonValue
    progress_target?: number
    active?: boolean
    created_at?: Date | string
    user_challenges?: UserChallengeCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUncheckedCreateInput = {
    id?: string
    challenge_id: string
    title: string
    description?: string | null
    category: string
    xp_reward: number
    difficulty?: string
    tasks: JsonNullValueInput | InputJsonValue
    progress_target?: number
    active?: boolean
    created_at?: Date | string
    user_challenges?: UserChallengeUncheckedCreateNestedManyWithoutChallengeInput
  }

  export type ChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_challenges?: UserChallengeUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_challenges?: UserChallengeUncheckedUpdateManyWithoutChallengeNestedInput
  }

  export type ChallengeCreateManyInput = {
    id?: string
    challenge_id: string
    title: string
    description?: string | null
    category: string
    xp_reward: number
    difficulty?: string
    tasks: JsonNullValueInput | InputJsonValue
    progress_target?: number
    active?: boolean
    created_at?: Date | string
  }

  export type ChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeCreateInput = {
    id?: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutChallenge_progressInput
    challenge: ChallengeCreateNestedOneWithoutUser_challengesInput
  }

  export type UserChallengeUncheckedCreateInput = {
    id?: string
    user_id: string
    challenge_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type UserChallengeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChallenge_progressNestedInput
    challenge?: ChallengeUpdateOneRequiredWithoutUser_challengesNestedInput
  }

  export type UserChallengeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeCreateManyInput = {
    id?: string
    user_id: string
    challenge_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type UserChallengeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionCreateInput = {
    id?: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutXp_transactionsInput
  }

  export type XpTransactionUncheckedCreateInput = {
    id?: string
    user_id: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
  }

  export type XpTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutXp_transactionsNestedInput
  }

  export type XpTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionCreateManyInput = {
    id?: string
    user_id: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
  }

  export type XpTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PassCreateInput = {
    id?: string
    pass_id: string
    user_id?: string | null
    title: string
    description?: string | null
    tier: $Enums.Tier
    status?: $Enums.PassStatus
    valid_until?: Date | string | null
    created_at?: Date | string
    claimed_at?: Date | string | null
  }

  export type PassUncheckedCreateInput = {
    id?: string
    pass_id: string
    user_id?: string | null
    title: string
    description?: string | null
    tier: $Enums.Tier
    status?: $Enums.PassStatus
    valid_until?: Date | string | null
    created_at?: Date | string
    claimed_at?: Date | string | null
  }

  export type PassUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pass_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    status?: EnumPassStatusFieldUpdateOperationsInput | $Enums.PassStatus
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claimed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PassUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pass_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    status?: EnumPassStatusFieldUpdateOperationsInput | $Enums.PassStatus
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claimed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PassCreateManyInput = {
    id?: string
    pass_id: string
    user_id?: string | null
    title: string
    description?: string | null
    tier: $Enums.Tier
    status?: $Enums.PassStatus
    valid_until?: Date | string | null
    created_at?: Date | string
    claimed_at?: Date | string | null
  }

  export type PassUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pass_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    status?: EnumPassStatusFieldUpdateOperationsInput | $Enums.PassStatus
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claimed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PassUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pass_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    status?: EnumPassStatusFieldUpdateOperationsInput | $Enums.PassStatus
    valid_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    claimed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FriendActivityCreateInput = {
    id?: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutFriend_activitiesInput
  }

  export type FriendActivityUncheckedCreateInput = {
    id?: string
    user_id: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
  }

  export type FriendActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFriend_activitiesNestedInput
  }

  export type FriendActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendActivityCreateManyInput = {
    id?: string
    user_id: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
  }

  export type FriendActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityCreateInput = {
    id?: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
    user: UserCreateNestedOneWithoutRecent_activitiesInput
  }

  export type RecentActivityUncheckedCreateInput = {
    id?: string
    user_id: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
  }

  export type RecentActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRecent_activitiesNestedInput
  }

  export type RecentActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityCreateManyInput = {
    id?: string
    user_id: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
  }

  export type RecentActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardEntryCreateInput = {
    id?: string
    user_id: string
    name: string
    xp_total: number
    tier: $Enums.Tier
    rank: number
    city?: string | null
    period?: $Enums.Period
    computed_at?: Date | string
  }

  export type LeaderboardEntryUncheckedCreateInput = {
    id?: string
    user_id: string
    name: string
    xp_total: number
    tier: $Enums.Tier
    rank: number
    city?: string | null
    period?: $Enums.Period
    computed_at?: Date | string
  }

  export type LeaderboardEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    xp_total?: IntFieldUpdateOperationsInput | number
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    rank?: IntFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    period?: EnumPeriodFieldUpdateOperationsInput | $Enums.Period
    computed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    xp_total?: IntFieldUpdateOperationsInput | number
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    rank?: IntFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    period?: EnumPeriodFieldUpdateOperationsInput | $Enums.Period
    computed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardEntryCreateManyInput = {
    id?: string
    user_id: string
    name: string
    xp_total: number
    tier: $Enums.Tier
    rank: number
    city?: string | null
    period?: $Enums.Period
    computed_at?: Date | string
  }

  export type LeaderboardEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    xp_total?: IntFieldUpdateOperationsInput | number
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    rank?: IntFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    period?: EnumPeriodFieldUpdateOperationsInput | $Enums.Period
    computed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaderboardEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    xp_total?: IntFieldUpdateOperationsInput | number
    tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    rank?: IntFieldUpdateOperationsInput | number
    city?: NullableStringFieldUpdateOperationsInput | string | null
    period?: EnumPeriodFieldUpdateOperationsInput | $Enums.Period
    computed_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTierFilter<$PrismaModel = never> = {
    equals?: $Enums.Tier | EnumTierFieldRefInput<$PrismaModel>
    in?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    not?: NestedEnumTierFilter<$PrismaModel> | $Enums.Tier
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserEventListRelationFilter = {
    every?: UserEventWhereInput
    some?: UserEventWhereInput
    none?: UserEventWhereInput
  }

  export type UserChallengeListRelationFilter = {
    every?: UserChallengeWhereInput
    some?: UserChallengeWhereInput
    none?: UserChallengeWhereInput
  }

  export type XpTransactionListRelationFilter = {
    every?: XpTransactionWhereInput
    some?: XpTransactionWhereInput
    none?: XpTransactionWhereInput
  }

  export type FriendActivityListRelationFilter = {
    every?: FriendActivityWhereInput
    some?: FriendActivityWhereInput
    none?: FriendActivityWhereInput
  }

  export type RecentActivityListRelationFilter = {
    every?: RecentActivityWhereInput
    some?: RecentActivityWhereInput
    none?: RecentActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserChallengeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type XpTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecentActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fan_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar_initials?: SortOrder
    city?: SortOrder
    member_since?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    xp_total?: SortOrder
    current_tier?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrder
    percentile?: SortOrder
    top_artist?: SortOrder
    top_venue?: SortOrder
    events_attended?: SortOrder
    spotify_id?: SortOrder
    apple_music_id?: SortOrder
    discord_id?: SortOrder
    lastfm_username?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    xp_total?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrder
    percentile?: SortOrder
    events_attended?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fan_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar_initials?: SortOrder
    city?: SortOrder
    member_since?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    xp_total?: SortOrder
    current_tier?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrder
    percentile?: SortOrder
    top_artist?: SortOrder
    top_venue?: SortOrder
    events_attended?: SortOrder
    spotify_id?: SortOrder
    apple_music_id?: SortOrder
    discord_id?: SortOrder
    lastfm_username?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fan_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar_initials?: SortOrder
    city?: SortOrder
    member_since?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    xp_total?: SortOrder
    current_tier?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrder
    percentile?: SortOrder
    top_artist?: SortOrder
    top_venue?: SortOrder
    events_attended?: SortOrder
    spotify_id?: SortOrder
    apple_music_id?: SortOrder
    discord_id?: SortOrder
    lastfm_username?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    xp_total?: SortOrder
    streak_days?: SortOrder
    rank?: SortOrder
    percentile?: SortOrder
    events_attended?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tier | EnumTierFieldRefInput<$PrismaModel>
    in?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    not?: NestedEnumTierWithAggregatesFilter<$PrismaModel> | $Enums.Tier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTierFilter<$PrismaModel>
    _max?: NestedEnumTierFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumEventCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryFilter<$PrismaModel> | $Enums.EventCategory
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    artist?: SortOrder
    venue?: SortOrder
    city?: SortOrder
    date?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    status?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    created_at?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    artist?: SortOrder
    venue?: SortOrder
    city?: SortOrder
    date?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    status?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    created_at?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    event_id?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    artist?: SortOrder
    venue?: SortOrder
    city?: SortOrder
    date?: SortOrder
    category?: SortOrder
    image_url?: SortOrder
    status?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    created_at?: SortOrder
  }

  export type EnumEventCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel> | $Enums.EventCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventCategoryFilter<$PrismaModel>
    _max?: NestedEnumEventCategoryFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type UserEventUser_idEvent_idCompoundUniqueInput = {
    user_id: string
    event_id: string
  }

  export type UserEventCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    bookmarked?: SortOrder
    notify_me?: SortOrder
    attended?: SortOrder
    created_at?: SortOrder
  }

  export type UserEventMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    bookmarked?: SortOrder
    notify_me?: SortOrder
    attended?: SortOrder
    created_at?: SortOrder
  }

  export type UserEventMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    event_id?: SortOrder
    bookmarked?: SortOrder
    notify_me?: SortOrder
    attended?: SortOrder
    created_at?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    challenge_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    xp_reward?: SortOrder
    difficulty?: SortOrder
    tasks?: SortOrder
    progress_target?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type ChallengeAvgOrderByAggregateInput = {
    xp_reward?: SortOrder
    progress_target?: SortOrder
  }

  export type ChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    challenge_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    xp_reward?: SortOrder
    difficulty?: SortOrder
    progress_target?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type ChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    challenge_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    xp_reward?: SortOrder
    difficulty?: SortOrder
    progress_target?: SortOrder
    active?: SortOrder
    created_at?: SortOrder
  }

  export type ChallengeSumOrderByAggregateInput = {
    xp_reward?: SortOrder
    progress_target?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ChallengeScalarRelationFilter = {
    is?: ChallengeWhereInput
    isNot?: ChallengeWhereInput
  }

  export type UserChallengeUser_idChallenge_idCompoundUniqueInput = {
    user_id: string
    challenge_id: string
  }

  export type UserChallengeCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    challenge_id?: SortOrder
    completed?: SortOrder
    progress?: SortOrder
    tasks_completed?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type UserChallengeAvgOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type UserChallengeMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    challenge_id?: SortOrder
    completed?: SortOrder
    progress?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type UserChallengeMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    challenge_id?: SortOrder
    completed?: SortOrder
    progress?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type UserChallengeSumOrderByAggregateInput = {
    progress?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type XpTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    source?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type XpTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type XpTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    source?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type XpTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    amount?: SortOrder
    source?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
  }

  export type XpTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PassStatus | EnumPassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPassStatusFilter<$PrismaModel> | $Enums.PassStatus
  }

  export type PassCountOrderByAggregateInput = {
    id?: SortOrder
    pass_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    valid_until?: SortOrder
    created_at?: SortOrder
    claimed_at?: SortOrder
  }

  export type PassMaxOrderByAggregateInput = {
    id?: SortOrder
    pass_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    valid_until?: SortOrder
    created_at?: SortOrder
    claimed_at?: SortOrder
  }

  export type PassMinOrderByAggregateInput = {
    id?: SortOrder
    pass_id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tier?: SortOrder
    status?: SortOrder
    valid_until?: SortOrder
    created_at?: SortOrder
    claimed_at?: SortOrder
  }

  export type EnumPassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PassStatus | EnumPassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPassStatusWithAggregatesFilter<$PrismaModel> | $Enums.PassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPassStatusFilter<$PrismaModel>
    _max?: NestedEnumPassStatusFilter<$PrismaModel>
  }

  export type FriendActivityCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    friend_name?: SortOrder
    activity?: SortOrder
    xp_change?: SortOrder
    created_at?: SortOrder
  }

  export type FriendActivityAvgOrderByAggregateInput = {
    xp_change?: SortOrder
  }

  export type FriendActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    friend_name?: SortOrder
    activity?: SortOrder
    xp_change?: SortOrder
    created_at?: SortOrder
  }

  export type FriendActivityMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    friend_name?: SortOrder
    activity?: SortOrder
    xp_change?: SortOrder
    created_at?: SortOrder
  }

  export type FriendActivitySumOrderByAggregateInput = {
    xp_change?: SortOrder
  }

  export type RecentActivityCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    activity?: SortOrder
    description?: SortOrder
    xp_earned?: SortOrder
    created_at?: SortOrder
  }

  export type RecentActivityAvgOrderByAggregateInput = {
    xp_earned?: SortOrder
  }

  export type RecentActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    activity?: SortOrder
    description?: SortOrder
    xp_earned?: SortOrder
    created_at?: SortOrder
  }

  export type RecentActivityMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    activity?: SortOrder
    description?: SortOrder
    xp_earned?: SortOrder
    created_at?: SortOrder
  }

  export type RecentActivitySumOrderByAggregateInput = {
    xp_earned?: SortOrder
  }

  export type EnumPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.Period | EnumPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumPeriodFilter<$PrismaModel> | $Enums.Period
  }

  export type LeaderboardEntryUser_idPeriodCompoundUniqueInput = {
    user_id: string
    period: $Enums.Period
  }

  export type LeaderboardEntryCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    xp_total?: SortOrder
    tier?: SortOrder
    rank?: SortOrder
    city?: SortOrder
    period?: SortOrder
    computed_at?: SortOrder
  }

  export type LeaderboardEntryAvgOrderByAggregateInput = {
    xp_total?: SortOrder
    rank?: SortOrder
  }

  export type LeaderboardEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    xp_total?: SortOrder
    tier?: SortOrder
    rank?: SortOrder
    city?: SortOrder
    period?: SortOrder
    computed_at?: SortOrder
  }

  export type LeaderboardEntryMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    name?: SortOrder
    xp_total?: SortOrder
    tier?: SortOrder
    rank?: SortOrder
    city?: SortOrder
    period?: SortOrder
    computed_at?: SortOrder
  }

  export type LeaderboardEntrySumOrderByAggregateInput = {
    xp_total?: SortOrder
    rank?: SortOrder
  }

  export type EnumPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Period | EnumPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumPeriodWithAggregatesFilter<$PrismaModel> | $Enums.Period
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPeriodFilter<$PrismaModel>
    _max?: NestedEnumPeriodFilter<$PrismaModel>
  }

  export type UserEventCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserChallengeCreateNestedManyWithoutUserInput = {
    create?: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput> | UserChallengeCreateWithoutUserInput[] | UserChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutUserInput | UserChallengeCreateOrConnectWithoutUserInput[]
    createMany?: UserChallengeCreateManyUserInputEnvelope
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
  }

  export type XpTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput> | XpTransactionCreateWithoutUserInput[] | XpTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: XpTransactionCreateOrConnectWithoutUserInput | XpTransactionCreateOrConnectWithoutUserInput[]
    createMany?: XpTransactionCreateManyUserInputEnvelope
    connect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
  }

  export type FriendActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput> | FriendActivityCreateWithoutUserInput[] | FriendActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendActivityCreateOrConnectWithoutUserInput | FriendActivityCreateOrConnectWithoutUserInput[]
    createMany?: FriendActivityCreateManyUserInputEnvelope
    connect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
  }

  export type RecentActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput> | RecentActivityCreateWithoutUserInput[] | RecentActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecentActivityCreateOrConnectWithoutUserInput | RecentActivityCreateOrConnectWithoutUserInput[]
    createMany?: RecentActivityCreateManyUserInputEnvelope
    connect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
  }

  export type UserEventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserChallengeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput> | UserChallengeCreateWithoutUserInput[] | UserChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutUserInput | UserChallengeCreateOrConnectWithoutUserInput[]
    createMany?: UserChallengeCreateManyUserInputEnvelope
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
  }

  export type XpTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput> | XpTransactionCreateWithoutUserInput[] | XpTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: XpTransactionCreateOrConnectWithoutUserInput | XpTransactionCreateOrConnectWithoutUserInput[]
    createMany?: XpTransactionCreateManyUserInputEnvelope
    connect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
  }

  export type FriendActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput> | FriendActivityCreateWithoutUserInput[] | FriendActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendActivityCreateOrConnectWithoutUserInput | FriendActivityCreateOrConnectWithoutUserInput[]
    createMany?: FriendActivityCreateManyUserInputEnvelope
    connect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
  }

  export type RecentActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput> | RecentActivityCreateWithoutUserInput[] | RecentActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecentActivityCreateOrConnectWithoutUserInput | RecentActivityCreateOrConnectWithoutUserInput[]
    createMany?: RecentActivityCreateManyUserInputEnvelope
    connect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTierFieldUpdateOperationsInput = {
    set?: $Enums.Tier
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserEventUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutUserInput | UserEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutUserInput | UserEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutUserInput | UserEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserChallengeUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput> | UserChallengeCreateWithoutUserInput[] | UserChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutUserInput | UserChallengeCreateOrConnectWithoutUserInput[]
    upsert?: UserChallengeUpsertWithWhereUniqueWithoutUserInput | UserChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserChallengeCreateManyUserInputEnvelope
    set?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    disconnect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    delete?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    update?: UserChallengeUpdateWithWhereUniqueWithoutUserInput | UserChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserChallengeUpdateManyWithWhereWithoutUserInput | UserChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
  }

  export type XpTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput> | XpTransactionCreateWithoutUserInput[] | XpTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: XpTransactionCreateOrConnectWithoutUserInput | XpTransactionCreateOrConnectWithoutUserInput[]
    upsert?: XpTransactionUpsertWithWhereUniqueWithoutUserInput | XpTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: XpTransactionCreateManyUserInputEnvelope
    set?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    disconnect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    delete?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    connect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    update?: XpTransactionUpdateWithWhereUniqueWithoutUserInput | XpTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: XpTransactionUpdateManyWithWhereWithoutUserInput | XpTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: XpTransactionScalarWhereInput | XpTransactionScalarWhereInput[]
  }

  export type FriendActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput> | FriendActivityCreateWithoutUserInput[] | FriendActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendActivityCreateOrConnectWithoutUserInput | FriendActivityCreateOrConnectWithoutUserInput[]
    upsert?: FriendActivityUpsertWithWhereUniqueWithoutUserInput | FriendActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendActivityCreateManyUserInputEnvelope
    set?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    disconnect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    delete?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    connect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    update?: FriendActivityUpdateWithWhereUniqueWithoutUserInput | FriendActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendActivityUpdateManyWithWhereWithoutUserInput | FriendActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendActivityScalarWhereInput | FriendActivityScalarWhereInput[]
  }

  export type RecentActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput> | RecentActivityCreateWithoutUserInput[] | RecentActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecentActivityCreateOrConnectWithoutUserInput | RecentActivityCreateOrConnectWithoutUserInput[]
    upsert?: RecentActivityUpsertWithWhereUniqueWithoutUserInput | RecentActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecentActivityCreateManyUserInputEnvelope
    set?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    disconnect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    delete?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    connect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    update?: RecentActivityUpdateWithWhereUniqueWithoutUserInput | RecentActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecentActivityUpdateManyWithWhereWithoutUserInput | RecentActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecentActivityScalarWhereInput | RecentActivityScalarWhereInput[]
  }

  export type UserEventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput> | UserEventCreateWithoutUserInput[] | UserEventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutUserInput | UserEventCreateOrConnectWithoutUserInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutUserInput | UserEventUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserEventCreateManyUserInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutUserInput | UserEventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutUserInput | UserEventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserChallengeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput> | UserChallengeCreateWithoutUserInput[] | UserChallengeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutUserInput | UserChallengeCreateOrConnectWithoutUserInput[]
    upsert?: UserChallengeUpsertWithWhereUniqueWithoutUserInput | UserChallengeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserChallengeCreateManyUserInputEnvelope
    set?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    disconnect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    delete?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    update?: UserChallengeUpdateWithWhereUniqueWithoutUserInput | UserChallengeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserChallengeUpdateManyWithWhereWithoutUserInput | UserChallengeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
  }

  export type XpTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput> | XpTransactionCreateWithoutUserInput[] | XpTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: XpTransactionCreateOrConnectWithoutUserInput | XpTransactionCreateOrConnectWithoutUserInput[]
    upsert?: XpTransactionUpsertWithWhereUniqueWithoutUserInput | XpTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: XpTransactionCreateManyUserInputEnvelope
    set?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    disconnect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    delete?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    connect?: XpTransactionWhereUniqueInput | XpTransactionWhereUniqueInput[]
    update?: XpTransactionUpdateWithWhereUniqueWithoutUserInput | XpTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: XpTransactionUpdateManyWithWhereWithoutUserInput | XpTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: XpTransactionScalarWhereInput | XpTransactionScalarWhereInput[]
  }

  export type FriendActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput> | FriendActivityCreateWithoutUserInput[] | FriendActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendActivityCreateOrConnectWithoutUserInput | FriendActivityCreateOrConnectWithoutUserInput[]
    upsert?: FriendActivityUpsertWithWhereUniqueWithoutUserInput | FriendActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendActivityCreateManyUserInputEnvelope
    set?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    disconnect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    delete?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    connect?: FriendActivityWhereUniqueInput | FriendActivityWhereUniqueInput[]
    update?: FriendActivityUpdateWithWhereUniqueWithoutUserInput | FriendActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendActivityUpdateManyWithWhereWithoutUserInput | FriendActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendActivityScalarWhereInput | FriendActivityScalarWhereInput[]
  }

  export type RecentActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput> | RecentActivityCreateWithoutUserInput[] | RecentActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RecentActivityCreateOrConnectWithoutUserInput | RecentActivityCreateOrConnectWithoutUserInput[]
    upsert?: RecentActivityUpsertWithWhereUniqueWithoutUserInput | RecentActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RecentActivityCreateManyUserInputEnvelope
    set?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    disconnect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    delete?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    connect?: RecentActivityWhereUniqueInput | RecentActivityWhereUniqueInput[]
    update?: RecentActivityUpdateWithWhereUniqueWithoutUserInput | RecentActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RecentActivityUpdateManyWithWhereWithoutUserInput | RecentActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RecentActivityScalarWhereInput | RecentActivityScalarWhereInput[]
  }

  export type UserEventCreateNestedManyWithoutEventInput = {
    create?: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput> | UserEventCreateWithoutEventInput[] | UserEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutEventInput | UserEventCreateOrConnectWithoutEventInput[]
    createMany?: UserEventCreateManyEventInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type UserEventUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput> | UserEventCreateWithoutEventInput[] | UserEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutEventInput | UserEventCreateOrConnectWithoutEventInput[]
    createMany?: UserEventCreateManyEventInputEnvelope
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
  }

  export type EnumEventCategoryFieldUpdateOperationsInput = {
    set?: $Enums.EventCategory
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserEventUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput> | UserEventCreateWithoutEventInput[] | UserEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutEventInput | UserEventCreateOrConnectWithoutEventInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutEventInput | UserEventUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: UserEventCreateManyEventInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutEventInput | UserEventUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutEventInput | UserEventUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserEventUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput> | UserEventCreateWithoutEventInput[] | UserEventUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserEventCreateOrConnectWithoutEventInput | UserEventCreateOrConnectWithoutEventInput[]
    upsert?: UserEventUpsertWithWhereUniqueWithoutEventInput | UserEventUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: UserEventCreateManyEventInputEnvelope
    set?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    disconnect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    delete?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    connect?: UserEventWhereUniqueInput | UserEventWhereUniqueInput[]
    update?: UserEventUpdateWithWhereUniqueWithoutEventInput | UserEventUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserEventUpdateManyWithWhereWithoutEventInput | UserEventUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEvent_interactionsInput = {
    create?: XOR<UserCreateWithoutEvent_interactionsInput, UserUncheckedCreateWithoutEvent_interactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEvent_interactionsInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutUser_eventsInput = {
    create?: XOR<EventCreateWithoutUser_eventsInput, EventUncheckedCreateWithoutUser_eventsInput>
    connectOrCreate?: EventCreateOrConnectWithoutUser_eventsInput
    connect?: EventWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEvent_interactionsNestedInput = {
    create?: XOR<UserCreateWithoutEvent_interactionsInput, UserUncheckedCreateWithoutEvent_interactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEvent_interactionsInput
    upsert?: UserUpsertWithoutEvent_interactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEvent_interactionsInput, UserUpdateWithoutEvent_interactionsInput>, UserUncheckedUpdateWithoutEvent_interactionsInput>
  }

  export type EventUpdateOneRequiredWithoutUser_eventsNestedInput = {
    create?: XOR<EventCreateWithoutUser_eventsInput, EventUncheckedCreateWithoutUser_eventsInput>
    connectOrCreate?: EventCreateOrConnectWithoutUser_eventsInput
    upsert?: EventUpsertWithoutUser_eventsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutUser_eventsInput, EventUpdateWithoutUser_eventsInput>, EventUncheckedUpdateWithoutUser_eventsInput>
  }

  export type UserChallengeCreateNestedManyWithoutChallengeInput = {
    create?: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput> | UserChallengeCreateWithoutChallengeInput[] | UserChallengeUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutChallengeInput | UserChallengeCreateOrConnectWithoutChallengeInput[]
    createMany?: UserChallengeCreateManyChallengeInputEnvelope
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
  }

  export type UserChallengeUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput> | UserChallengeCreateWithoutChallengeInput[] | UserChallengeUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutChallengeInput | UserChallengeCreateOrConnectWithoutChallengeInput[]
    createMany?: UserChallengeCreateManyChallengeInputEnvelope
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
  }

  export type UserChallengeUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput> | UserChallengeCreateWithoutChallengeInput[] | UserChallengeUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutChallengeInput | UserChallengeCreateOrConnectWithoutChallengeInput[]
    upsert?: UserChallengeUpsertWithWhereUniqueWithoutChallengeInput | UserChallengeUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: UserChallengeCreateManyChallengeInputEnvelope
    set?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    disconnect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    delete?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    update?: UserChallengeUpdateWithWhereUniqueWithoutChallengeInput | UserChallengeUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: UserChallengeUpdateManyWithWhereWithoutChallengeInput | UserChallengeUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
  }

  export type UserChallengeUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput> | UserChallengeCreateWithoutChallengeInput[] | UserChallengeUncheckedCreateWithoutChallengeInput[]
    connectOrCreate?: UserChallengeCreateOrConnectWithoutChallengeInput | UserChallengeCreateOrConnectWithoutChallengeInput[]
    upsert?: UserChallengeUpsertWithWhereUniqueWithoutChallengeInput | UserChallengeUpsertWithWhereUniqueWithoutChallengeInput[]
    createMany?: UserChallengeCreateManyChallengeInputEnvelope
    set?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    disconnect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    delete?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    connect?: UserChallengeWhereUniqueInput | UserChallengeWhereUniqueInput[]
    update?: UserChallengeUpdateWithWhereUniqueWithoutChallengeInput | UserChallengeUpdateWithWhereUniqueWithoutChallengeInput[]
    updateMany?: UserChallengeUpdateManyWithWhereWithoutChallengeInput | UserChallengeUpdateManyWithWhereWithoutChallengeInput[]
    deleteMany?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutChallenge_progressInput = {
    create?: XOR<UserCreateWithoutChallenge_progressInput, UserUncheckedCreateWithoutChallenge_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallenge_progressInput
    connect?: UserWhereUniqueInput
  }

  export type ChallengeCreateNestedOneWithoutUser_challengesInput = {
    create?: XOR<ChallengeCreateWithoutUser_challengesInput, ChallengeUncheckedCreateWithoutUser_challengesInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutUser_challengesInput
    connect?: ChallengeWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutChallenge_progressNestedInput = {
    create?: XOR<UserCreateWithoutChallenge_progressInput, UserUncheckedCreateWithoutChallenge_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutChallenge_progressInput
    upsert?: UserUpsertWithoutChallenge_progressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChallenge_progressInput, UserUpdateWithoutChallenge_progressInput>, UserUncheckedUpdateWithoutChallenge_progressInput>
  }

  export type ChallengeUpdateOneRequiredWithoutUser_challengesNestedInput = {
    create?: XOR<ChallengeCreateWithoutUser_challengesInput, ChallengeUncheckedCreateWithoutUser_challengesInput>
    connectOrCreate?: ChallengeCreateOrConnectWithoutUser_challengesInput
    upsert?: ChallengeUpsertWithoutUser_challengesInput
    connect?: ChallengeWhereUniqueInput
    update?: XOR<XOR<ChallengeUpdateToOneWithWhereWithoutUser_challengesInput, ChallengeUpdateWithoutUser_challengesInput>, ChallengeUncheckedUpdateWithoutUser_challengesInput>
  }

  export type UserCreateNestedOneWithoutXp_transactionsInput = {
    create?: XOR<UserCreateWithoutXp_transactionsInput, UserUncheckedCreateWithoutXp_transactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutXp_transactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutXp_transactionsNestedInput = {
    create?: XOR<UserCreateWithoutXp_transactionsInput, UserUncheckedCreateWithoutXp_transactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutXp_transactionsInput
    upsert?: UserUpsertWithoutXp_transactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutXp_transactionsInput, UserUpdateWithoutXp_transactionsInput>, UserUncheckedUpdateWithoutXp_transactionsInput>
  }

  export type EnumPassStatusFieldUpdateOperationsInput = {
    set?: $Enums.PassStatus
  }

  export type UserCreateNestedOneWithoutFriend_activitiesInput = {
    create?: XOR<UserCreateWithoutFriend_activitiesInput, UserUncheckedCreateWithoutFriend_activitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_activitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFriend_activitiesNestedInput = {
    create?: XOR<UserCreateWithoutFriend_activitiesInput, UserUncheckedCreateWithoutFriend_activitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriend_activitiesInput
    upsert?: UserUpsertWithoutFriend_activitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriend_activitiesInput, UserUpdateWithoutFriend_activitiesInput>, UserUncheckedUpdateWithoutFriend_activitiesInput>
  }

  export type UserCreateNestedOneWithoutRecent_activitiesInput = {
    create?: XOR<UserCreateWithoutRecent_activitiesInput, UserUncheckedCreateWithoutRecent_activitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecent_activitiesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRecent_activitiesNestedInput = {
    create?: XOR<UserCreateWithoutRecent_activitiesInput, UserUncheckedCreateWithoutRecent_activitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRecent_activitiesInput
    upsert?: UserUpsertWithoutRecent_activitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRecent_activitiesInput, UserUpdateWithoutRecent_activitiesInput>, UserUncheckedUpdateWithoutRecent_activitiesInput>
  }

  export type EnumPeriodFieldUpdateOperationsInput = {
    set?: $Enums.Period
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumTierFilter<$PrismaModel = never> = {
    equals?: $Enums.Tier | EnumTierFieldRefInput<$PrismaModel>
    in?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    not?: NestedEnumTierFilter<$PrismaModel> | $Enums.Tier
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tier | EnumTierFieldRefInput<$PrismaModel>
    in?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tier[] | ListEnumTierFieldRefInput<$PrismaModel>
    not?: NestedEnumTierWithAggregatesFilter<$PrismaModel> | $Enums.Tier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTierFilter<$PrismaModel>
    _max?: NestedEnumTierFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEventCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryFilter<$PrismaModel> | $Enums.EventCategory
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EventCategory | EnumEventCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.EventCategory[] | ListEnumEventCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumEventCategoryWithAggregatesFilter<$PrismaModel> | $Enums.EventCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventCategoryFilter<$PrismaModel>
    _max?: NestedEnumEventCategoryFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPassStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PassStatus | EnumPassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPassStatusFilter<$PrismaModel> | $Enums.PassStatus
  }

  export type NestedEnumPassStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PassStatus | EnumPassStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PassStatus[] | ListEnumPassStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPassStatusWithAggregatesFilter<$PrismaModel> | $Enums.PassStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPassStatusFilter<$PrismaModel>
    _max?: NestedEnumPassStatusFilter<$PrismaModel>
  }

  export type NestedEnumPeriodFilter<$PrismaModel = never> = {
    equals?: $Enums.Period | EnumPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumPeriodFilter<$PrismaModel> | $Enums.Period
  }

  export type NestedEnumPeriodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Period | EnumPeriodFieldRefInput<$PrismaModel>
    in?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    notIn?: $Enums.Period[] | ListEnumPeriodFieldRefInput<$PrismaModel>
    not?: NestedEnumPeriodWithAggregatesFilter<$PrismaModel> | $Enums.Period
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPeriodFilter<$PrismaModel>
    _max?: NestedEnumPeriodFilter<$PrismaModel>
  }

  export type UserEventCreateWithoutUserInput = {
    id?: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
    event: EventCreateNestedOneWithoutUser_eventsInput
  }

  export type UserEventUncheckedCreateWithoutUserInput = {
    id?: string
    event_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserEventCreateOrConnectWithoutUserInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput>
  }

  export type UserEventCreateManyUserInputEnvelope = {
    data: UserEventCreateManyUserInput | UserEventCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserChallengeCreateWithoutUserInput = {
    id?: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
    challenge: ChallengeCreateNestedOneWithoutUser_challengesInput
  }

  export type UserChallengeUncheckedCreateWithoutUserInput = {
    id?: string
    challenge_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type UserChallengeCreateOrConnectWithoutUserInput = {
    where: UserChallengeWhereUniqueInput
    create: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput>
  }

  export type UserChallengeCreateManyUserInputEnvelope = {
    data: UserChallengeCreateManyUserInput | UserChallengeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type XpTransactionCreateWithoutUserInput = {
    id?: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
  }

  export type XpTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
  }

  export type XpTransactionCreateOrConnectWithoutUserInput = {
    where: XpTransactionWhereUniqueInput
    create: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput>
  }

  export type XpTransactionCreateManyUserInputEnvelope = {
    data: XpTransactionCreateManyUserInput | XpTransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendActivityCreateWithoutUserInput = {
    id?: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
  }

  export type FriendActivityUncheckedCreateWithoutUserInput = {
    id?: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
  }

  export type FriendActivityCreateOrConnectWithoutUserInput = {
    where: FriendActivityWhereUniqueInput
    create: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput>
  }

  export type FriendActivityCreateManyUserInputEnvelope = {
    data: FriendActivityCreateManyUserInput | FriendActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RecentActivityCreateWithoutUserInput = {
    id?: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
  }

  export type RecentActivityUncheckedCreateWithoutUserInput = {
    id?: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
  }

  export type RecentActivityCreateOrConnectWithoutUserInput = {
    where: RecentActivityWhereUniqueInput
    create: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput>
  }

  export type RecentActivityCreateManyUserInputEnvelope = {
    data: RecentActivityCreateManyUserInput | RecentActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserEventUpsertWithWhereUniqueWithoutUserInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutUserInput, UserEventUncheckedUpdateWithoutUserInput>
    create: XOR<UserEventCreateWithoutUserInput, UserEventUncheckedCreateWithoutUserInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutUserInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutUserInput, UserEventUncheckedUpdateWithoutUserInput>
  }

  export type UserEventUpdateManyWithWhereWithoutUserInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutUserInput>
  }

  export type UserEventScalarWhereInput = {
    AND?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
    OR?: UserEventScalarWhereInput[]
    NOT?: UserEventScalarWhereInput | UserEventScalarWhereInput[]
    id?: StringFilter<"UserEvent"> | string
    user_id?: StringFilter<"UserEvent"> | string
    event_id?: StringFilter<"UserEvent"> | string
    bookmarked?: BoolFilter<"UserEvent"> | boolean
    notify_me?: BoolFilter<"UserEvent"> | boolean
    attended?: BoolFilter<"UserEvent"> | boolean
    created_at?: DateTimeFilter<"UserEvent"> | Date | string
  }

  export type UserChallengeUpsertWithWhereUniqueWithoutUserInput = {
    where: UserChallengeWhereUniqueInput
    update: XOR<UserChallengeUpdateWithoutUserInput, UserChallengeUncheckedUpdateWithoutUserInput>
    create: XOR<UserChallengeCreateWithoutUserInput, UserChallengeUncheckedCreateWithoutUserInput>
  }

  export type UserChallengeUpdateWithWhereUniqueWithoutUserInput = {
    where: UserChallengeWhereUniqueInput
    data: XOR<UserChallengeUpdateWithoutUserInput, UserChallengeUncheckedUpdateWithoutUserInput>
  }

  export type UserChallengeUpdateManyWithWhereWithoutUserInput = {
    where: UserChallengeScalarWhereInput
    data: XOR<UserChallengeUpdateManyMutationInput, UserChallengeUncheckedUpdateManyWithoutUserInput>
  }

  export type UserChallengeScalarWhereInput = {
    AND?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
    OR?: UserChallengeScalarWhereInput[]
    NOT?: UserChallengeScalarWhereInput | UserChallengeScalarWhereInput[]
    id?: StringFilter<"UserChallenge"> | string
    user_id?: StringFilter<"UserChallenge"> | string
    challenge_id?: StringFilter<"UserChallenge"> | string
    completed?: BoolFilter<"UserChallenge"> | boolean
    progress?: IntFilter<"UserChallenge"> | number
    tasks_completed?: JsonFilter<"UserChallenge">
    completed_at?: DateTimeNullableFilter<"UserChallenge"> | Date | string | null
    created_at?: DateTimeFilter<"UserChallenge"> | Date | string
  }

  export type XpTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: XpTransactionWhereUniqueInput
    update: XOR<XpTransactionUpdateWithoutUserInput, XpTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<XpTransactionCreateWithoutUserInput, XpTransactionUncheckedCreateWithoutUserInput>
  }

  export type XpTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: XpTransactionWhereUniqueInput
    data: XOR<XpTransactionUpdateWithoutUserInput, XpTransactionUncheckedUpdateWithoutUserInput>
  }

  export type XpTransactionUpdateManyWithWhereWithoutUserInput = {
    where: XpTransactionScalarWhereInput
    data: XOR<XpTransactionUpdateManyMutationInput, XpTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type XpTransactionScalarWhereInput = {
    AND?: XpTransactionScalarWhereInput | XpTransactionScalarWhereInput[]
    OR?: XpTransactionScalarWhereInput[]
    NOT?: XpTransactionScalarWhereInput | XpTransactionScalarWhereInput[]
    id?: StringFilter<"XpTransaction"> | string
    user_id?: StringFilter<"XpTransaction"> | string
    amount?: IntFilter<"XpTransaction"> | number
    source?: StringFilter<"XpTransaction"> | string
    reference?: StringNullableFilter<"XpTransaction"> | string | null
    description?: StringNullableFilter<"XpTransaction"> | string | null
    created_at?: DateTimeFilter<"XpTransaction"> | Date | string
  }

  export type FriendActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: FriendActivityWhereUniqueInput
    update: XOR<FriendActivityUpdateWithoutUserInput, FriendActivityUncheckedUpdateWithoutUserInput>
    create: XOR<FriendActivityCreateWithoutUserInput, FriendActivityUncheckedCreateWithoutUserInput>
  }

  export type FriendActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: FriendActivityWhereUniqueInput
    data: XOR<FriendActivityUpdateWithoutUserInput, FriendActivityUncheckedUpdateWithoutUserInput>
  }

  export type FriendActivityUpdateManyWithWhereWithoutUserInput = {
    where: FriendActivityScalarWhereInput
    data: XOR<FriendActivityUpdateManyMutationInput, FriendActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type FriendActivityScalarWhereInput = {
    AND?: FriendActivityScalarWhereInput | FriendActivityScalarWhereInput[]
    OR?: FriendActivityScalarWhereInput[]
    NOT?: FriendActivityScalarWhereInput | FriendActivityScalarWhereInput[]
    id?: StringFilter<"FriendActivity"> | string
    user_id?: StringFilter<"FriendActivity"> | string
    friend_name?: StringFilter<"FriendActivity"> | string
    activity?: StringFilter<"FriendActivity"> | string
    xp_change?: IntNullableFilter<"FriendActivity"> | number | null
    created_at?: DateTimeFilter<"FriendActivity"> | Date | string
  }

  export type RecentActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: RecentActivityWhereUniqueInput
    update: XOR<RecentActivityUpdateWithoutUserInput, RecentActivityUncheckedUpdateWithoutUserInput>
    create: XOR<RecentActivityCreateWithoutUserInput, RecentActivityUncheckedCreateWithoutUserInput>
  }

  export type RecentActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: RecentActivityWhereUniqueInput
    data: XOR<RecentActivityUpdateWithoutUserInput, RecentActivityUncheckedUpdateWithoutUserInput>
  }

  export type RecentActivityUpdateManyWithWhereWithoutUserInput = {
    where: RecentActivityScalarWhereInput
    data: XOR<RecentActivityUpdateManyMutationInput, RecentActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type RecentActivityScalarWhereInput = {
    AND?: RecentActivityScalarWhereInput | RecentActivityScalarWhereInput[]
    OR?: RecentActivityScalarWhereInput[]
    NOT?: RecentActivityScalarWhereInput | RecentActivityScalarWhereInput[]
    id?: StringFilter<"RecentActivity"> | string
    user_id?: StringFilter<"RecentActivity"> | string
    activity?: StringFilter<"RecentActivity"> | string
    description?: StringNullableFilter<"RecentActivity"> | string | null
    xp_earned?: IntFilter<"RecentActivity"> | number
    created_at?: DateTimeFilter<"RecentActivity"> | Date | string
  }

  export type UserEventCreateWithoutEventInput = {
    id?: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
    user: UserCreateNestedOneWithoutEvent_interactionsInput
  }

  export type UserEventUncheckedCreateWithoutEventInput = {
    id?: string
    user_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserEventCreateOrConnectWithoutEventInput = {
    where: UserEventWhereUniqueInput
    create: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput>
  }

  export type UserEventCreateManyEventInputEnvelope = {
    data: UserEventCreateManyEventInput | UserEventCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type UserEventUpsertWithWhereUniqueWithoutEventInput = {
    where: UserEventWhereUniqueInput
    update: XOR<UserEventUpdateWithoutEventInput, UserEventUncheckedUpdateWithoutEventInput>
    create: XOR<UserEventCreateWithoutEventInput, UserEventUncheckedCreateWithoutEventInput>
  }

  export type UserEventUpdateWithWhereUniqueWithoutEventInput = {
    where: UserEventWhereUniqueInput
    data: XOR<UserEventUpdateWithoutEventInput, UserEventUncheckedUpdateWithoutEventInput>
  }

  export type UserEventUpdateManyWithWhereWithoutEventInput = {
    where: UserEventScalarWhereInput
    data: XOR<UserEventUpdateManyMutationInput, UserEventUncheckedUpdateManyWithoutEventInput>
  }

  export type UserCreateWithoutEvent_interactionsInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    challenge_progress?: UserChallengeCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEvent_interactionsInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    challenge_progress?: UserChallengeUncheckedCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionUncheckedCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityUncheckedCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEvent_interactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEvent_interactionsInput, UserUncheckedCreateWithoutEvent_interactionsInput>
  }

  export type EventCreateWithoutUser_eventsInput = {
    id?: string
    event_id: string
    title: string
    subtitle?: string | null
    artist?: string | null
    venue: string
    city: string
    date: Date | string
    category: $Enums.EventCategory
    image_url?: string | null
    status?: string | null
    trending?: boolean
    featured?: boolean
    created_at?: Date | string
  }

  export type EventUncheckedCreateWithoutUser_eventsInput = {
    id?: string
    event_id: string
    title: string
    subtitle?: string | null
    artist?: string | null
    venue: string
    city: string
    date: Date | string
    category: $Enums.EventCategory
    image_url?: string | null
    status?: string | null
    trending?: boolean
    featured?: boolean
    created_at?: Date | string
  }

  export type EventCreateOrConnectWithoutUser_eventsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUser_eventsInput, EventUncheckedCreateWithoutUser_eventsInput>
  }

  export type UserUpsertWithoutEvent_interactionsInput = {
    update: XOR<UserUpdateWithoutEvent_interactionsInput, UserUncheckedUpdateWithoutEvent_interactionsInput>
    create: XOR<UserCreateWithoutEvent_interactionsInput, UserUncheckedCreateWithoutEvent_interactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEvent_interactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEvent_interactionsInput, UserUncheckedUpdateWithoutEvent_interactionsInput>
  }

  export type UserUpdateWithoutEvent_interactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    challenge_progress?: UserChallengeUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEvent_interactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    challenge_progress?: UserChallengeUncheckedUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUncheckedUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUncheckedUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithoutUser_eventsInput = {
    update: XOR<EventUpdateWithoutUser_eventsInput, EventUncheckedUpdateWithoutUser_eventsInput>
    create: XOR<EventCreateWithoutUser_eventsInput, EventUncheckedCreateWithoutUser_eventsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutUser_eventsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutUser_eventsInput, EventUncheckedUpdateWithoutUser_eventsInput>
  }

  export type EventUpdateWithoutUser_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateWithoutUser_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: NullableStringFieldUpdateOperationsInput | string | null
    artist?: NullableStringFieldUpdateOperationsInput | string | null
    venue?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: EnumEventCategoryFieldUpdateOperationsInput | $Enums.EventCategory
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeCreateWithoutChallengeInput = {
    id?: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
    user: UserCreateNestedOneWithoutChallenge_progressInput
  }

  export type UserChallengeUncheckedCreateWithoutChallengeInput = {
    id?: string
    user_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type UserChallengeCreateOrConnectWithoutChallengeInput = {
    where: UserChallengeWhereUniqueInput
    create: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput>
  }

  export type UserChallengeCreateManyChallengeInputEnvelope = {
    data: UserChallengeCreateManyChallengeInput | UserChallengeCreateManyChallengeInput[]
    skipDuplicates?: boolean
  }

  export type UserChallengeUpsertWithWhereUniqueWithoutChallengeInput = {
    where: UserChallengeWhereUniqueInput
    update: XOR<UserChallengeUpdateWithoutChallengeInput, UserChallengeUncheckedUpdateWithoutChallengeInput>
    create: XOR<UserChallengeCreateWithoutChallengeInput, UserChallengeUncheckedCreateWithoutChallengeInput>
  }

  export type UserChallengeUpdateWithWhereUniqueWithoutChallengeInput = {
    where: UserChallengeWhereUniqueInput
    data: XOR<UserChallengeUpdateWithoutChallengeInput, UserChallengeUncheckedUpdateWithoutChallengeInput>
  }

  export type UserChallengeUpdateManyWithWhereWithoutChallengeInput = {
    where: UserChallengeScalarWhereInput
    data: XOR<UserChallengeUpdateManyMutationInput, UserChallengeUncheckedUpdateManyWithoutChallengeInput>
  }

  export type UserCreateWithoutChallenge_progressInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChallenge_progressInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventUncheckedCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionUncheckedCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityUncheckedCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChallenge_progressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChallenge_progressInput, UserUncheckedCreateWithoutChallenge_progressInput>
  }

  export type ChallengeCreateWithoutUser_challengesInput = {
    id?: string
    challenge_id: string
    title: string
    description?: string | null
    category: string
    xp_reward: number
    difficulty?: string
    tasks: JsonNullValueInput | InputJsonValue
    progress_target?: number
    active?: boolean
    created_at?: Date | string
  }

  export type ChallengeUncheckedCreateWithoutUser_challengesInput = {
    id?: string
    challenge_id: string
    title: string
    description?: string | null
    category: string
    xp_reward: number
    difficulty?: string
    tasks: JsonNullValueInput | InputJsonValue
    progress_target?: number
    active?: boolean
    created_at?: Date | string
  }

  export type ChallengeCreateOrConnectWithoutUser_challengesInput = {
    where: ChallengeWhereUniqueInput
    create: XOR<ChallengeCreateWithoutUser_challengesInput, ChallengeUncheckedCreateWithoutUser_challengesInput>
  }

  export type UserUpsertWithoutChallenge_progressInput = {
    update: XOR<UserUpdateWithoutChallenge_progressInput, UserUncheckedUpdateWithoutChallenge_progressInput>
    create: XOR<UserCreateWithoutChallenge_progressInput, UserUncheckedCreateWithoutChallenge_progressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChallenge_progressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChallenge_progressInput, UserUncheckedUpdateWithoutChallenge_progressInput>
  }

  export type UserUpdateWithoutChallenge_progressInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChallenge_progressInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUncheckedUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUncheckedUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChallengeUpsertWithoutUser_challengesInput = {
    update: XOR<ChallengeUpdateWithoutUser_challengesInput, ChallengeUncheckedUpdateWithoutUser_challengesInput>
    create: XOR<ChallengeCreateWithoutUser_challengesInput, ChallengeUncheckedCreateWithoutUser_challengesInput>
    where?: ChallengeWhereInput
  }

  export type ChallengeUpdateToOneWithWhereWithoutUser_challengesInput = {
    where?: ChallengeWhereInput
    data: XOR<ChallengeUpdateWithoutUser_challengesInput, ChallengeUncheckedUpdateWithoutUser_challengesInput>
  }

  export type ChallengeUpdateWithoutUser_challengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChallengeUncheckedUpdateWithoutUser_challengesInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    xp_reward?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    tasks?: JsonNullValueInput | InputJsonValue
    progress_target?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutXp_transactionsInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutXp_transactionsInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventUncheckedCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeUncheckedCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityUncheckedCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutXp_transactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutXp_transactionsInput, UserUncheckedCreateWithoutXp_transactionsInput>
  }

  export type UserUpsertWithoutXp_transactionsInput = {
    update: XOR<UserUpdateWithoutXp_transactionsInput, UserUncheckedUpdateWithoutXp_transactionsInput>
    create: XOR<UserCreateWithoutXp_transactionsInput, UserUncheckedCreateWithoutXp_transactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutXp_transactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutXp_transactionsInput, UserUncheckedUpdateWithoutXp_transactionsInput>
  }

  export type UserUpdateWithoutXp_transactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutXp_transactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUncheckedUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUncheckedUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFriend_activitiesInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriend_activitiesInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventUncheckedCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeUncheckedCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionUncheckedCreateNestedManyWithoutUserInput
    recent_activities?: RecentActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriend_activitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriend_activitiesInput, UserUncheckedCreateWithoutFriend_activitiesInput>
  }

  export type UserUpsertWithoutFriend_activitiesInput = {
    update: XOR<UserUpdateWithoutFriend_activitiesInput, UserUncheckedUpdateWithoutFriend_activitiesInput>
    create: XOR<UserCreateWithoutFriend_activitiesInput, UserUncheckedCreateWithoutFriend_activitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriend_activitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriend_activitiesInput, UserUncheckedUpdateWithoutFriend_activitiesInput>
  }

  export type UserUpdateWithoutFriend_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriend_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUncheckedUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUncheckedUpdateManyWithoutUserNestedInput
    recent_activities?: RecentActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutRecent_activitiesInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRecent_activitiesInput = {
    id?: string
    fan_id: string
    email?: string | null
    name: string
    avatar_initials: string
    city: string
    member_since?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    xp_total?: number
    current_tier?: $Enums.Tier
    streak_days?: number
    rank?: number | null
    percentile?: number | null
    top_artist?: string | null
    top_venue?: string | null
    events_attended?: number
    spotify_id?: string | null
    apple_music_id?: string | null
    discord_id?: string | null
    lastfm_username?: string | null
    event_interactions?: UserEventUncheckedCreateNestedManyWithoutUserInput
    challenge_progress?: UserChallengeUncheckedCreateNestedManyWithoutUserInput
    xp_transactions?: XpTransactionUncheckedCreateNestedManyWithoutUserInput
    friend_activities?: FriendActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRecent_activitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRecent_activitiesInput, UserUncheckedCreateWithoutRecent_activitiesInput>
  }

  export type UserUpsertWithoutRecent_activitiesInput = {
    update: XOR<UserUpdateWithoutRecent_activitiesInput, UserUncheckedUpdateWithoutRecent_activitiesInput>
    create: XOR<UserCreateWithoutRecent_activitiesInput, UserUncheckedCreateWithoutRecent_activitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRecent_activitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRecent_activitiesInput, UserUncheckedUpdateWithoutRecent_activitiesInput>
  }

  export type UserUpdateWithoutRecent_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRecent_activitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    fan_id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    avatar_initials?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    member_since?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    xp_total?: IntFieldUpdateOperationsInput | number
    current_tier?: EnumTierFieldUpdateOperationsInput | $Enums.Tier
    streak_days?: IntFieldUpdateOperationsInput | number
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    percentile?: NullableIntFieldUpdateOperationsInput | number | null
    top_artist?: NullableStringFieldUpdateOperationsInput | string | null
    top_venue?: NullableStringFieldUpdateOperationsInput | string | null
    events_attended?: IntFieldUpdateOperationsInput | number
    spotify_id?: NullableStringFieldUpdateOperationsInput | string | null
    apple_music_id?: NullableStringFieldUpdateOperationsInput | string | null
    discord_id?: NullableStringFieldUpdateOperationsInput | string | null
    lastfm_username?: NullableStringFieldUpdateOperationsInput | string | null
    event_interactions?: UserEventUncheckedUpdateManyWithoutUserNestedInput
    challenge_progress?: UserChallengeUncheckedUpdateManyWithoutUserNestedInput
    xp_transactions?: XpTransactionUncheckedUpdateManyWithoutUserNestedInput
    friend_activities?: FriendActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserEventCreateManyUserInput = {
    id?: string
    event_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserChallengeCreateManyUserInput = {
    id?: string
    challenge_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type XpTransactionCreateManyUserInput = {
    id?: string
    amount: number
    source: string
    reference?: string | null
    description?: string | null
    created_at?: Date | string
  }

  export type FriendActivityCreateManyUserInput = {
    id?: string
    friend_name: string
    activity: string
    xp_change?: number | null
    created_at?: Date | string
  }

  export type RecentActivityCreateManyUserInput = {
    id?: string
    activity: string
    description?: string | null
    xp_earned?: number
    created_at?: Date | string
  }

  export type UserEventUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutUser_eventsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    challenge?: ChallengeUpdateOneRequiredWithoutUser_challengesNestedInput
  }

  export type UserChallengeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    challenge_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type XpTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    source?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    friend_name?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    xp_change?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecentActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    activity?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    xp_earned?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventCreateManyEventInput = {
    id?: string
    user_id: string
    bookmarked?: boolean
    notify_me?: boolean
    attended?: boolean
    created_at?: Date | string
  }

  export type UserEventUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEvent_interactionsNestedInput
  }

  export type UserEventUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserEventUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bookmarked?: BoolFieldUpdateOperationsInput | boolean
    notify_me?: BoolFieldUpdateOperationsInput | boolean
    attended?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeCreateManyChallengeInput = {
    id?: string
    user_id: string
    completed?: boolean
    progress?: number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type UserChallengeUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutChallenge_progressNestedInput
  }

  export type UserChallengeUncheckedUpdateWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserChallengeUncheckedUpdateManyWithoutChallengeInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    progress?: IntFieldUpdateOperationsInput | number
    tasks_completed?: JsonNullValueInput | InputJsonValue
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}