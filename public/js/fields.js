const fields = [
    {
        tag: "select", name: "Difficult level", required: true, multiple: false,
        options: ["", "Easy", "Medium", "Hard"]
    },
    {
        tag: "select", name: "Category", required: false, multiple: false,
        options: ["", "Array", "Strings", "Linked list", "Tree", "Graphs"]
    },
    { tag: "input", name: "Name", required: true },
    { tag: "textarea", name: "Description", required: true },
    { tag: "textarea", name: "Constraints", required: false },
    { tag: "textarea", name: "Input", required: false },
    { tag: "textarea", name: "Output", required: false },
    { tag: "textarea", name: "Example", required: false },
    { tag: "textarea", name: "Explanation", required: false },
    { tag: "textarea", name: "Solution", required: true },
];