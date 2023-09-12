import React, { useCallback, useEffect, useState } from "react";
import { Link, navigate, useQueryParams } from "raviger";
import { formData } from "../types/formTypes";
import CreateForm from "./CreateForm";
import { deleteForm, listForms } from "../utils/apiUtils";
import Modal from "./common/modal";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const fetchForms = (
  setFormsCB: (value: formData[]) => void,
  setCountCB: (count: number) => void,
  offset: number,
  limit: number
) => {
  listForms({ offset: offset, limit: limit })
    .then((data) => {
      setCountCB(data.count);
      setFormsCB(data.results);
    })
    .catch((error) => console.log(error));
};

export default function Home() {
  const [{ search }, setQuery] = useQueryParams();
  const [searchString, setSearchString] = useState("");
  const [forms, setForms] = useState<formData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const limit = 3;

  const deleteLocalForm = (id: number) => {
    setForms((form) => form.filter((form) => form.id !== id));
    deleteForm(id).then(() => fetchForms(setForms, setCount, offset, limit));
  };

  useEffect(() => fetchForms(setForms, setCount, offset, limit), [offset]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const arrayItems = Array.from(forms);
    const [movedElement] = arrayItems.splice(source.index, 1);
    arrayItems.splice(destination.index, 0, movedElement);
    setForms(arrayItems);
  };

  const onKeyPressHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.shiftKey === true) {
        if (event.key === "A") {
          navigate("/about");
        }
        if (event.key === "S") {
          setSearchString("");
          document.getElementById("search")?.focus();
        }
        if (event.key === "N") {
          setOpenForm(true);
        }
        if (event.key === "L") {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
      if (event.key === "ArrowRight") {
        setOffset((offset) => {
          return offset + limit < count ? offset + limit : offset;
        });
      }
      if (event.key === "ArrowLeft") {
        setOffset((offset) => {
          return offset - limit >= 0 ? offset - limit : offset;
        });
      }
    },
    [count]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressHandler);
    document.addEventListener("keyup", onKeyPressHandler);
    return () => {
      document.removeEventListener("keydown", onKeyPressHandler);
      document.removeEventListener("keyup", onKeyPressHandler);
    };
  }, [onKeyPressHandler]);

  return (
    <div className="flex flex-col justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery({ search: searchString });
        }}
      >
        <div className="w-full">
          <input
            type="text"
            id={"search"}
            value={searchString}
            name="search"
            placeholder="Search"
            onChange={(event) => setSearchString(event.target.value)}
            className="border-2 border-gray-400 focus:border-gray-600 bg-white h-10 px-5 pr-1 rounded-lg text-m focus:outline-none m-2"
          />
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 my-4 rounded-lg"
          >
            <span className="ml-2 font-semibold">Search</span>
          </button>
        </div>
      </form>
      <div className="flex gap-2  mt-4 justify-between items-center">
        <h1 className="font-bold text-2xl">Forms</h1>

        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-2 m-4 rounded-lg"
          onClick={() => setOpenForm(true)}
        >
          Create Form
        </button>
      </div>
      {forms.length > 0 && (
        <div className="flex-col flex justify-center items-center">
          <div>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
              <Droppable droppableId="listForms">
                {(provided) => (
                  <div
                    className="listForms"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {forms
                      .filter((form) =>
                        form.title
                          .toLowerCase()
                          .includes(search?.toLowerCase() || "")
                      )
                      .map((form, index) => (
                        <Draggable
                          draggableId={`${index}`}
                          index={index}
                          key={form.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className=" relative z-0"
                            >
                              <div
                                className={`flex w-full my-2 bg-sky-200 border rounded-lg border-gray-600 ${
                                  snapshot.isDragging ? "border-red-400" : ""
                                } `}
                                key={form.id}
                              >
                                <div className="flex flex-col w-full">
                                  <h2 className="flex font-medium text-lg px-2">
                                    {form.title}
                                  </h2>
                                  <h2 className="flex px-2">
                                    {form.description}
                                  </h2>
                                </div>
                                <Link
                                  href={`/forms/${form.id}`}
                                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                                >
                                  Edit
                                </Link>
                                <Link
                                  href={`/preview/${form.id}`}
                                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                                >
                                  Preview
                                </Link>
                                <button
                                  onClick={() => deleteLocalForm(form.id)}
                                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 m-4 rounded-lg"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          <div className="w-full pt-4 rounded-none border min-w-0 text-sm p-2.5 bg-sky-200 border-gray-600 placeholder-gray-400 text-gray-900 focus:ring-gray-500 focus:border-gray-500">
            <div className="flex">
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset - limit >= 0 ? offset - limit : offset;
                  });
                }}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded-lg"
              >
                <span className="font-semibold">Prev</span>
              </button>
              <div className="w-full text-sm bg-sky-200 text-gray-900">
                <p className="text-gray-700 text-center">
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">
                    {offset + limit < count ? offset + limit : count}
                  </span>{" "}
                  of <span className="font-medium">{count}</span> results
                </p>
              </div>
              <button
                onClick={() => {
                  setOffset((offset) => {
                    return offset + limit < count ? offset + limit : offset;
                  });
                }}
                className="bg-sky-500 hover:bg-sky-700 text-white font-bold px-2 py-1 rounded-lg"
              >
                <p className="font-semibold">Next</p>
              </button>
            </div>
          </div>
        </div>
      )}
      {forms.length === 0 && (
        <p className="text-gray-700 mt-2">There are no forms created!</p>
      )}
      <Modal Open={openForm} closeCB={() => setOpenForm(false)}>
        <CreateForm />
      </Modal>
    </div>
  );
}
