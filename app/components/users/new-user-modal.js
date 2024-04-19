import { Button, Modal, TextInput } from "@mantine/core";

import { showNotification } from "@mantine/notifications";
import { IconUser } from "@tabler/icons";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { fetchUsersList,submitUser } from "@/app/store/users-slice";
import store from "@/app/store/store";


function NewUserModal() {
  const [opened, setOpened] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [company, setCompany] = useState();
  
  function clearForm() {
    setName("");
    setEmail("");
    setCompany("");
  }

  

  const isSubmitting = useSelector(
    (state) => state.users.submissionStatus == "loading"
  );

  const dispatch = useDispatch();

  async function submitDetails() {
    if ( isSubmitting) {
      return;
    }

    const params = {};
    params["name"] = name;
    params["email"] = email;
    params["company"] = company;

    try {
      await dispatch(submitUser(params)).unwrap();
      showNotification({
        position: "top-right",
        zIndex: 2077,
        title: "New User Successfully Created",
        autoClose: false,
      });
      clearForm();
      setOpened(false);
      store.dispatch(fetchUsersList());
    } catch (e) {
      let message = null;
      if (e?.message ?? null) {
        message = e.message;
      } else {
        message = "Could not save record";
      }
      showNotification({
        title: "Error",
        message,
        color: "red",
      });
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        title="New User"
        onClose={() => setOpened(false)}
        padding="xs"
        overflow="inside"
      >
        <section className="flex flex-col space-y-2 bg-light p-3 rounded-lg">
          <span className="text-dark text-sm font-bold">
            User Information
          </span>
          <TextInput
            placeholder="Name"
            label="Name"
            withAsterisk
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />

          <TextInput
            placeholder="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <TextInput
            placeholder="Company"
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.currentTarget.value)}
          />

         
        </section>

        <section className="flex justify-end space-y-2 bg-light p-3 rounded-lg my-3">
          <Button onClick={submitDetails} loading={isSubmitting}>
            Save
          </Button>
        </section>
      </Modal>

      <Button
        leftIcon={<IconUser size={14} />}
        variant="outline"
        onClick={() => setOpened(true)}
      >
        New
      </Button>
    </>
  );
}

export default NewUserModal;
