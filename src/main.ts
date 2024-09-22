import './css/style.css';
import ListItem from './model/ListItem';
import FullList from './model/FullList';
import ListTemplate from './templates/ListTemplate';

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const form = document.querySelector('#itemEntryForm') as HTMLFormElement;

  form.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.querySelector('#newItem') as HTMLInputElement;
    let inputVal: string = input.value.trim();
    if (!inputVal) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), inputVal);

    fullList.addList(newItem);
    template.render(fullList);
    inputVal = ""
  });

  const clearBtn = document.querySelector('#clearItemsButton') as HTMLButtonElement;

  clearBtn.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);

  // const addBtn = document.querySelector('#addItem') as HTMLButtonElement;

  // addBtn.addEventListener('click', (): void => {
  //   fullList.addList(template);
  // });
};

document.addEventListener('DOMContentLoaded', initApp);
