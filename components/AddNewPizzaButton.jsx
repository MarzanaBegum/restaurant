const AddNewPizzaButton = ({ setClose }) => {
  return (
    <div>
      <button
        onClick={() => setClose(false)}
        className="bg-orange-600 text-white mt-4 rounded-md p-2 ml-3"
      >
        Add New Pizza
      </button>
    </div>
  );
};

export default AddNewPizzaButton;
