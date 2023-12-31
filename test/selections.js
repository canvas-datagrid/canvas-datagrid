import { SelectionType } from '../lib/selections/util.js';
import {
  mouseup,
  mousedown,
  de,
  bb,
  mousemove,
  assertPxColor,
  doAssert,
  g,
  smallData,
  assertIf,
  c,
  click,
} from './util.js';

export default function () {
  it('Should select all', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectAll();
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== smallData().length,
            'Expected data interface `selectedRows` to contain all rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select all via ctrl/cmnd a', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.focus();
    de(grid.controlInput, 'keydown', { key: 'a', ctrlKey: true });
    setTimeout(function () {
      grid.style.activeCellSelectedBackgroundColor = c.y;
      grid.style.cellSelectedBackgroundColor = c.y;
      assertPxColor(grid, 90, 30, c.y, function (err) {
        if (err) {
          return done(err);
        }
        assertPxColor(grid, 360, 90, c.y, function (err) {
          if (err) {
            return done(err);
          }
          done(
            assertIf(
              grid.selectedRows.length !== smallData().length,
              'Expected data interface `selectedRows` to contain all rows.  It does not.',
            ),
          );
        });
      });
    }, 100);
  });
  it('Selection keystrokes should do nothing if the grid is not focused.', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    de(grid.controlInput, 'keydown', { key: 'a', ctrlKey: true });
    setTimeout(function () {
      grid.style.activeCellBackgroundColor = c.b;
      grid.style.cellBackgroundColor = c.b;
      assertPxColor(grid, 90, 30, c.b, function (err) {
        if (err) {
          return done(err);
        }
        assertPxColor(grid, 360, 90, c.b, function (err) {
          if (err) {
            return done(err);
          }
          done(
            assertIf(
              grid.selectedRows.length === 1,
              'Expected just the first row to be selected',
            ),
          );
        });
      });
    }, 100);
  });
  it('Should de-select all via esc', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.focus();
    de(grid.controlInput, 'keydown', { key: 'Escape' });
    setTimeout(function () {
      grid.style.activeCellBackgroundColor = c.y;
      grid.style.cellBackgroundColor = c.y;
      assertPxColor(grid, 90, 30, c.y, function (err) {
        if (err) {
          return done(err);
        }
        assertPxColor(grid, 360, 90, c.y, function (err) {
          if (err) {
            return done(err);
          }
          done(
            assertIf(
              grid.selectedRows.length !== 0,
              'Expected data interface `selectedRows` to contain no rows.',
            ),
          );
        });
      });
    }, 100);
  });
  it('Should dispatch a `selectionchanged` event on esc', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.focus();
    grid.addEventListener('selectionchanged', function (event) {
      try {
        // TODO: remove the following line in the version 1.x
        doAssert(event.selections.length === 0, 'selection is empty');
        doAssert(
          Array.isArray(event.selectionList),
          'selectionList is not an array in the event context',
        );
        doAssert(event.selectionList.length === 0, 'selectionList is empty');
      } catch (error) {
        done(error);
      }

      done();
    });
    de(grid.controlInput, 'keydown', { key: 'Escape' });
  });

  it('Should select a row', function (done) {
    const grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectRow(0);
    chai.assert.deepStrictEqual(grid.selectionList.length, 1);
    chai.assert.deepStrictEqual(grid.selectionList[0], {
      type: SelectionType.Rows,
      startRow: 0,
      endRow: 0,
    });

    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.b, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== 1,
            'Expected data interface `selectedRows` 1 row.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a row, then add to the selection with control', function (done) {
    const grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectRow(0);
    chai.assert.deepStrictEqual(grid.selectionList.length, 1);
    chai.assert.deepStrictEqual(grid.selectionList[0], {
      type: SelectionType.Rows,
      startRow: 0,
      endRow: 0,
    });

    grid.selectRow(2, true);
    const orderedSelectionList = [...grid.selectionList].sort(
      (a, b) => a.startRow - b.startRow,
    );
    chai.assert.deepStrictEqual(orderedSelectionList.length, 2);
    chai.assert.deepStrictEqual(orderedSelectionList[0], {
      type: SelectionType.Rows,
      startRow: 0,
      endRow: 0,
    });
    chai.assert.deepStrictEqual(orderedSelectionList[1], {
      type: SelectionType.Rows,
      startRow: 2,
      endRow: 2,
    });

    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.filter(function (row) {
              // Each row is an object in here, so the following statement is invalid in previous test
              //     return row[0] !== null;
              return row && Object.keys(row).length > 0;
            }).length !== 2,
            'Expected data interface `selectedRows` 2 rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a row, then add to the selection with control, then remove it with control', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectRow(0);
    grid.selectRow(2, true);
    grid.selectRow(0, true);
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 340, 30, c.b, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.filter(function (row) {
              return row !== null;
            }).length !== 1,
            'Expected data interface `selectedRows` 1 row.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a range of rows by holding shift', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectRow(0);
    grid.selectRow(2, null, true);
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.filter(function (row) {
              return row !== null;
            }).length !== 3,
            'Expected data interface `selectedRows` 1 row.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a column', function (done) {
    const grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectColumn(0);
    chai.assert.deepStrictEqual(grid.selectionList.length, 1);
    chai.assert.deepStrictEqual(grid.selectionList[0], {
      type: SelectionType.Columns,
      startColumn: 0,
      endColumn: 0,
    });

    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.b, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== smallData().length,
            'Expected data interface `selectedRows` to contain all rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a column, then add a column to the selection.', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectColumn(0);
    grid.selectColumn(1, true);
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== smallData().length,
            'Expected data interface `selectedRows` to contain all rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a range of columns via shift.', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
      style: {
        cellWidth: 50,
      },
    });
    grid.selectColumn(0);
    grid.selectColumn(2, false, true);
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 70, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 170, 90, c.y, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== smallData().length,
            'Expected data interface `selectedRows` to contain all rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select a column, then add to the column selection and immediately remove it', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.selectColumn(0);
    grid.selectColumn(1, true);
    grid.selectColumn(1, true);
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.b;
    assertPxColor(grid, 90, 30, c.y, function (err) {
      if (err) {
        return done(err);
      }
      assertPxColor(grid, 360, 90, c.b, function (err) {
        if (err) {
          return done(err);
        }
        done(
          assertIf(
            grid.selectedRows.length !== smallData().length,
            'Expected data interface `selectedRows` to contain all rows.  It does not.',
          ),
        );
      });
    });
  });
  it('Should select an area when click and drag occurs', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.fu;
    setTimeout(function () {
      grid.focus();
      mousemove(window, 67, 30, grid.canvas);
      mousedown(grid.canvas, 67, 30);
      mousemove(window, 320, 65, grid.canvas);
      mouseup(document.body, 320, 65, grid.canvas);
      mouseup(grid.canvas, 320, 65, grid.canvas);
      click(grid.canvas, 320, 65);
      assertPxColor(grid, 67, 30, c.y, function (err) {
        if (err) {
          return done(err);
        }
        assertPxColor(grid, 350, 65, c.y, function (err) {
          if (err) {
            return done(err);
          }
          assertPxColor(grid, 360, 80, c.fu, function (err) {
            if (err) {
              return done(err);
            }
            done(
              assertIf(
                grid.selectedRows.length !== smallData().length - 1,
                'Expected data interface `selectedRows` to contain all but one rows.  It does not.',
              ),
            );
          });
        });
      });
    }, 1);
  });
  it('Should remove a cell from selection when holding control and clicking a selected cell', function (done) {
    var grid = g({
      test: this.test,
      data: smallData(),
    });
    grid.style.activeCellSelectedBackgroundColor = c.y;
    grid.style.cellHoverBackgroundColor = c.b;
    grid.style.cellSelectedBackgroundColor = c.y;
    grid.style.cellBackgroundColor = c.fu;
    setTimeout(function () {
      var p = bb(grid.canvas);
      grid.focus();
      mousemove(window, 67, 30, grid.canvas);
      mousedown(grid.canvas, 67, 30);
      mousemove(window, 320, 65, grid.canvas);
      mouseup(document.body, 320, 65, grid.canvas);
      mouseup(grid.canvas, 320, 65, grid.canvas);
      click(grid.canvas, 320, 65);
      // ctrl click
      de(document.body, 'mousemove', {
        clientX: 320 + p.left,
        clientY: 65 + p.top,
        ctrlKey: true,
      });
      de(grid.canvas, 'mousedown', {
        clientX: 320 + p.left,
        clientY: 65 + p.top,
        ctrlKey: true,
      });
      de(document.body, 'mouseup', {
        clientX: 320 + p.left,
        clientY: 65 + p.top,
        ctrlKey: true,
      });
      de(grid.canvas, 'mouseup', {
        clientX: 320 + p.left,
        clientY: 65 + p.top,
        ctrlKey: true,
      });
      assertPxColor(grid, 67, 30, c.y, function (err) {
        if (err) {
          return done(err);
        }
        assertPxColor(grid, 350, 65, c.b, function (err) {
          if (err) {
            return done(err);
          }
          assertPxColor(grid, 360, 80, c.fu, function (err) {
            if (err) {
              return done(err);
            }
            done(
              assertIf(
                grid.selectedRows.length !== smallData().length - 1 &&
                  grid.selectedRows[1].col2 === undefined,
                'Expected data interface `selectedRows` to contain row 1 col1 and col2, row 2 col 1.  It does not.',
              ),
            );
          });
        });
      });
    }, 1);
  });
  it('selecting an area emits event with selected cells', async function () {
    const grid = g({
      test: this.test,
      data: smallData(),
    });

    const event = await selectAreaAndWaitEvent(grid, {
      top: 1,
      left: 0,
      bottom: 2,
      right: 1,
    });
    doAssert(event.selectedCells.length === 4, '4 cells are selected');
    doAssert(
      event.selectedCells[0].boundRowIndex ==
        event.selectedCells[0].viewRowIndex,
      'bound and view row index are identical',
    );
  });
  it('selecting an area emits different row indices for filtered data', async function () {
    const grid = g({
      test: this.test,
      data: smallData(),
    });

    grid.setFilter('col1', 'ba');
    const event = await selectAreaAndWaitEvent(grid, {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
    });
    doAssert(
      event.selectedCells[0].boundRowIndex ==
        event.selectedCells[0].viewRowIndex + 1,
      'first view row is second bound data row',
    );
  });
  it('selecting an area emits different column indices for ordered columns', async function () {
    const grid = g({
      test: this.test,
      data: smallData(),
    });

    grid.columnOrder = [2, 1, 0];
    const event = await selectAreaAndWaitEvent(grid, {
      top: 0,
      left: 0,
      bottom: 1,
      right: 1,
    });
    doAssert(
      event.selectedCells[0].boundColumnIndex ==
        event.selectedCells[0].viewColumnIndex + 2,
      'first view column is third bound column',
    );
    doAssert(
      event.selectedCells[0].header.name === 'col3',
      'first column matches reordered column name',
    );
  });

  it('selecting all cells in a column can only produce one selection descriptor in the list', async function () {
    const data = smallData();
    const grid = g({
      test: this.test,
      data,
    });

    await selectAreaAndWaitEvent(grid, {
      top: 0,
      left: 0,
      bottom: data.length - 1,
      right: 0,
    });
    chai.assert.deepStrictEqual(grid.selectionList[0], {
      type: SelectionType.Columns,
      startColumn: 0,
      endColumn: 0,
    });
  });

  it('selecting all cells in a row can only produce one selection descriptor in the list', async function () {
    const data = smallData();
    const columns = Object.keys(data[0]).length;
    const grid = g({
      test: this.test,
      data,
    });

    await selectAreaAndWaitEvent(grid, {
      top: 1,
      left: 0,
      bottom: 1,
      right: columns - 1,
    });
    chai.assert.deepStrictEqual(grid.selectionList[0], {
      type: SelectionType.Rows,
      startRow: 1,
      endRow: 1,
    });
  });

  it('Contiguous selections can be merged to one descriptor in the list', async function () {
    const data = smallData();
    // const columns = Object.keys(data[0]).length;
    // const rows = data.length;
    const grid = g({
      test: this.test,
      data,
    });

    // □ □  => ▧ □
    // □ □     □ □
    let event = await selectAreaAndWaitEvent(grid, {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    });
    chai.assert.deepStrictEqual(event.selectionList.length, 1);
    chai.assert.deepStrictEqual(event.selectionList[0], {
      type: SelectionType.Cells,
      startRow: 0,
      endRow: 0,
      startColumn: 0,
      endColumn: 0,
    });

    // ▧ □  => ▧ ▧
    // □ □     □ ▧
    event = await selectAreaAndWaitEvent(
      grid,
      {
        top: 0,
        left: 1,
        bottom: 1,
        right: 1,
      },
      true,
    );
    chai.assert.deepStrictEqual(event.selectionList.length, 2);

    // ▧ ▧  => ▧ ▧
    // □ ▧     ▧ ▧
    event = await selectAreaAndWaitEvent(
      grid,
      {
        top: 1,
        left: 0,
        bottom: 1,
        right: 0,
      },
      true,
    );
    chai.assert.deepStrictEqual(event.selectionList.length, 1);
    chai.assert.deepStrictEqual(event.selectionList[0], {
      type: SelectionType.Cells,
      startRow: 0,
      endRow: 1,
      startColumn: 0,
      endColumn: 1,
    });
  });

  function selectAreaAndWaitEvent(grid, area, ctrl) {
    setTimeout(grid.selectArea.bind(grid, area, ctrl), 1);
    return listenSelectionChangedEvent(grid);
  }
  function listenSelectionChangedEvent(grid) {
    return Promise.race([
      new Promise((resolve) => {
        const listener = function (event) {
          grid.removeEventListener(listener);
          resolve(event);
        };
        grid.addEventListener('selectionchanged', listener);
      }),
      new Promise((resolve, reject) =>
        setTimeout(reject, 500, new Error('no selectionchanged event')),
      ),
    ]);
  }
}
