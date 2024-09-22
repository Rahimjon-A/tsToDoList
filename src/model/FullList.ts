import ListItem from './ListItem';

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addList(itemObj: ListItem): void;
  removeList(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");
    if(storedList !== 'string') return

    const parsedList: {_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList); 

    parsedList.forEach(itemObj => {
      const newItemList = new ListItem(itemObj._id, itemObj._item, itemObj._checked);
      FullList.instance.addList(newItemList);
    })
  }

  save(): void {
    localStorage.setItem('myList', JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addList(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeList(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
