import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@repo/ui/lib/utils'

const SortableItem = ({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`focus:outline-none ${isDragging ? 'opacity-50' : ''}`}
      tabIndex={0}
      aria-roledescription="draggable item"
    >
      {children}
    </li>
  )
}

type Props = React.HTMLAttributes<HTMLUListElement> & {
  data: any[]
  handleDragEnd: (event: { active: any; over: any }) => void
  cardComponent: React.ComponentType<{ data: any }>
}

export const VerticalSortableList = ({
  data,
  handleDragEnd,
  cardComponent: CardComponent,
  className,
  ...props
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={data} strategy={verticalListSortingStrategy}>
        <ul
          className={cn('mx-auto max-w-md', className)}
          role="list"
          {...props}
        >
          {data.map((item) => (
            <SortableItem id={item.id} key={item.id}>
              <CardComponent data={item} />
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}
