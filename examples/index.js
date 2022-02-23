import canvasDatagrid from 'canvas-datagrid';

const gridElement = document.getElementById('grid');

canvasDatagrid({
  parentNode: gridElement,
  data: [
    { foo: 1, bar: 2, baz: 3 },
    { foo: 4, bar: 5, baz: 6 },
  ],
});
