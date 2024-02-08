import { ElementType } from "react";

interface ForEachProps<T extends { id: any }> {
  items: T[];
  render: ElementType;
}

export function ForEach<T extends { id: any }>(props: ForEachProps<T>) {
  return props.items.map((item) => <props.render {...item} key={item.id}/>);
}
