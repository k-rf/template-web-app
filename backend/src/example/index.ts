import { z } from "zod";

import { DomainPrimitive } from "~/shared/domain-primitive";

type Props = {
  name: Name;
  age: Age;
  info?: Info;
};

export class User extends DomainPrimitive<Props, "User"> {
  type = "User" as const;

  protected validate(value: Props): Props {
    return value;
  }
}

class Name extends DomainPrimitive<string, "Name"> {
  type = "Name" as const;

  protected validate(value: string): string {
    return value;
  }
}

class Age extends DomainPrimitive<number, "Age"> {
  type = "Age" as const;

  protected validate(value: number): number {
    return value;
  }
}

class Info extends DomainPrimitive<string, "Info"> {
  type = "Info" as const;

  protected validate(value: string): string {
    return value;
  }
}

type Todo = {
  id: string;
  content: string;
  detail?: string;
  due?: Date;
  children: Todo[];
};

export const Todo: z.ZodType<Todo> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    content: z.string().min(1),
    detail: z.string().min(1),
    due: z.date(),
    children: z.array(Todo),
  })
);

export const fn = (args: Todo) => {
  console.log(args);
};
