const shoppinglistCreateDtoInType = shape({
  name: string(255).isRequired(),
  memberIdList: array(uuIdentity()),
  itemList: array(string(255)),
});

const shoppinglistGetDtoInType = shape({
  id: id().isRequired(),
});

const shoppinglistListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  })
});

const shoppinglistUpdateDtoInType = shape({
  id: id().isRequired(),
  name: string(255),
  memberIdList: array(uuIdentity()),
  isArchived: boolean(),
});

const shoppinglistLeaveDtoInType = shape({
  id: id().isRequired(),
});

const shoppinglistDeleteDtoInType = shape({
  id: id().isRequired(),
});

const shoppinglistItemAddDtoInType = shape({
  shoppinglistId: id().isRequired(),
  value: string(255).isRequired(),
});

const shoppinglistItemUpdateDtoInType = shape({
  shoppinglistId: id().isRequired(),
  item: shape({
    id: id().isRequired(),
    value: string(255),
    isResolved: boolean(),
  }).isRequired(),
});

const shoppinglistItemDeleteDtoInType = shape({
  shoppinglistId: id().isRequired(),
  itemId: id().isRequired(),
});
