const genereateCards = (list: string, count: number) => {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push({
      id: `${list}_task_${i}`,
      title: `${list.toLocaleUpperCase()}--Task_${i}`,
      activities: [] as any[],
    });
  }
  return cards;
};

const generateColumns = (count: number) => {
  const columns = [];
  for (let i = 0; i < count; i++) {
    columns.push({
      id: `column_${i}`,
      title: `column ${i}`,
      cards: genereateCards(`column_${i}`, i + 2),
    });
  }
  return columns;
};
export type ColumnType = ReturnType<typeof generateColumns>[number];
export const initialColumns = generateColumns(3) as ReturnType<typeof generateColumns>;

export const grid = 8;
export const borderRadius = 2;

export const colors = {
  GREY100: '#ECEFF1',
  GREY200: '#CFD8DC',
  GREY300: '#B0BEC5',
  GREY400: '#90A4AE',
  GREY500: '#78909C',

  RED100: '#FFEBEE',
  RED200: '#FFCDD2',
  RED300: '#EF9A9A',
  RED400: '#E57373',
  RED500: '#EF5350',

  BLUE100: '#E3F2FD',
  BLUE200: '#BBDEFB',
  BLUE300: '#90CAF9',
  BLUE400: '#64B5F6',
  BLUE500: '#42A5F5',

  YELLOW100: '#FFFDE7',
  YELLOW200: '#FFF9C4',
  YELLOW300: '#FFF59D',
  YELLOW400: '#FFF176',
  YELLOW500: '#FFEE58',

  GREEN100: '#E8F5E9',
  GREEN200: '#C8E6C9',
  GREEN300: '#A5D6A7',
  GREEN400: '#81C784',
  GREEN500: '#66BB6A',
};

/* 

    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_: any, idx: number) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
*/
