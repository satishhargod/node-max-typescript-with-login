export const commonFiles = {
  createCategory: {
    name: { require: true },
  },
  updateCategory: {
    name: { require: false },
    id: { require: true },
  },
  createSubCategory: {
    name: { require: true },
  },
  updateSubCategory: {
    name: { require: false },
    id: { require: true },
  },
  createProject: {
    title: { require: true },
  },
  updateProject: { title: { require: false }, id: { require: true } },
};
