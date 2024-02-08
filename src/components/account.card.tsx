import { numberToCurrency } from "../utils/number.to.currence";

interface AccountCardProps {
  name: string;
  amount: number;
}

export function AccountCard({ name, amount }: AccountCardProps) {
  return (
    <li className="w-full border border-zinc-500 flex flex-col cursor-pointer hover:border-zinc-50">
      <span className="p-3 bg-zinc-900 border-b border-b-zinc-500 text-zinc-100 uppercase">
        {name}
      </span>
      <span className="w-full px-3 py-6 bg-zinc-800 text-4xl text-right">
        {numberToCurrency(amount)}
      </span>
    </li>
  );
}
