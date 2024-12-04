import KanbanList from "./kanban-list";
export default function CategoryItem({ title,logo }: { title: string, logo: string }) {
  return (
    <li
      key={1}
      className="overflow-hidden rounded-xl border border-gray-200 w-90"
    >
      <KanbanList title={title} logo={logo} />
    </li>
  );
}
