import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  setModalDelete,
  setModalUpdate,
  role,
  userId,
  postUserId,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 border-none ">
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none justify-start">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  // onClick={() => setModalDelete(true)}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-yellow-500 "
                      : "text-yellow-500 ",
                    "block px-4 py-2 text-sm "
                  )}
                >
                  Report
                </button>
              )}
            </Menu.Item>
            {/* Jika User Id dan User Id pada post sama atau role orang yang login tidak sama dengan admin maka tampilkan Edit Post */}
            {userId === postUserId || role !== "admin" ? (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setModalUpdate(true)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900 " : "text-gray-700 ",
                      "block px-4 py-2 text-sm "
                    )}
                  >
                    Edit Post
                  </button>
                )}
              </Menu.Item>
            ) : (
              ""
            )}

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setModalDelete(true)}
                  className={classNames(
                    active ? "bg-gray-100 text-red-500 " : "text-red-500 ",
                    "block px-4 py-2 text-sm "
                  )}
                >
                  Delete Post
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
