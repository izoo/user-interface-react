import { Button, Modal, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { IconPencil } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";
import store from "../../../../store/store";
import { submitEditUser,fetchUsersList } from "@/app/store/users-slice";

function EditUser({ user }) {
  const { data: session, status } = useSession();
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [company, setCompany] = useState(user.company);
  

  function clearForm() {
    setName("");
    setEmail("");
    setCompany("");
  }

  const isSubmitting = useSelector(
    (state) => state.users.EditSubmissionStatus == "loading"
  );

  const dispatch = useDispatch();
  async function submitDetails() {
    // if (!session || status !== "authenticated" || isSubmitting) {
    //   return;
    // }

    const params = {};

    params["id"] = user?.id;
    params["name"] = name;
    params["email"] = email;
    params["company"] = company;
   
    try {
      await dispatch(submitEditUser(params)).unwrap();

      showNotification({
        title: "Success",
        message: "Record updated successfully",
        color: "green",
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
        title={`Edit User #${user?.name}`}
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
        leftIcon={<IconPencil size={14} />}
        variant="outline"
        onClick={() => setOpened(true)}
        size="xs"
      >
        Edit
      </Button>
    </>
  );
}

export default EditUser;
