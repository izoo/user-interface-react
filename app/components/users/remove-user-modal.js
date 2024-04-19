import { useState } from "react";
import { Modal, Button, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { deleteUser, fetchUsersList } from "@/app/store/users-slice";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "@mantine/notifications";

function RemoveUserModal({ item }) {
  const { data: session, status } = useSession();
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();

  const isDeleting = useSelector(
    (state) => state.users.deleteUserStatus === "loading"
  );

  async function submitDetails() {
    if ( isDeleting) {
      return;
    }

    const params = {};
    params["itemId"] = item.id;

    try {
      dispatch(deleteUser(params));

      showNotification({
        title: "Success",
        message: "Record deleted successfully",
        color: "green",
      });

      setOpened(false);
      dispatch(fetchUsersList(params));
    } catch (e) {
      let message = null;
      if (e?.message ?? null) {
        message = e.message;
      } else {
        message = "Could not deleted record";
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
        title="Delete Record?"
        onClose={() => setOpened(false)}
        padding="xs"
        overflow="inside"
      >
        <span className="px-2">This operation is irreversible</span>
        <section className="flex justify-end p-2 rounded-lg my-3 gap-2">
          <Button variant="default" onClick={() => setOpened(false)}>
            Back
          </Button>

          <Button color="red" onClick={submitDetails} loading={isDeleting}>
            Delete
          </Button>
        </section>
      </Modal>

      <ActionIcon
        variant="outline"
        color="red"
        onClick={() => setOpened(true)}
        size="lg"
      >
        <IconTrash size={14} />
      </ActionIcon>
    </>
  );
}

export default RemoveUserModal;
