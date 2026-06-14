import Link from "next/link";

interface ToolCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export default function ToolCard({ href, icon, title, description }: ToolCardProps) {
  return (
    <Link href={href}>
      <div className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
        <div className="text-3xl mb-3">{icon}</div>
        <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 mb-1">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}
