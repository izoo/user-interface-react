import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUsersList } from "@/app/store/users-slice";

import Card from "../../../ui/layouts/card";
import { TextInput} from "@mantine/core";
import PaginationLinks from "../../../ui/layouts/pagination-links";
import { Table, Thead, Trow } from "../../../ui/layouts/scrolling-table";
import TableCardHeader from "../../../ui/layouts/table-card-header";
import StatelessLoadingSpinner from "../../../ui/utils/stateless-loading-spinner";
import store from "../../../../store/store";
import EditUser from "./edit-user-modal";
import RemoveUserModal from "./remove-user-modal";
 
function UsersListView() {
  const { data: session, status } = useSession();

  const [searchTerm, setSearchTerm] = useState("");

  const usersListStatus = useSelector(
    (state) => state.users.fetchUsersListStatus
  );
  const usersList = useSelector((state) => state.users.usersList);

  const isLoadingList = usersListStatus === "loading";

  useEffect(() => {
    
    const params = {};
    

    if (searchTerm) {
      params["filter"] = searchTerm;
    }

    store.dispatch(fetchUsersList(params));
  }, [searchTerm, session, status]);

  function onPaginationLinkClicked(page) {
    if (!page) {
      return;
    }

    const params = {};
    params["page"] = page;

    store.dispatch(fetchUsersList(params));
  }

  function refreshList() {
    if (!session || status !== "authenticated") {
      return;
    }

    const params = {};
    params["accessToken"] = session?.user?.accessToken;

    store.dispatch(fetchUsersList(params));
  }

  const actions = (
    <Fragment>
      
    </Fragment>
  );

  return (
    <section className="space-y-2 w-full">
      <div className="flex w-full justify-center">
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Card>
        <TableCardHeader actions={actions}></TableCardHeader>
        <Table>
          <Thead>
            <tr>
              <th scope="col" className="th-primary">
                ID
              </th>
              <th scope="col" className="th-primary">
                NAME
              </th>
              <th scope="col" className="th-primary">
                COMPANY
              </th>
              
              <th scope="col" className="th-primary">
                ACTION
              </th>
            </tr>
          </Thead>
          <tbody>
            {usersList &&
              usersList?.data?.map((item) => (
                <Trow key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email ?? "-"}</td>
                  <td>{item.company ?? "-"}</td>
                  
                  <td className="py-0 pl-14 2xl:pl-4">

                      <span className="flex justify-end items-center w-full gap-2">
                        <EditUser user={item} />

                        <RemoveUserModal item={item} />
                        
                      </span>

                  </td>
                  <td></td>
                </Trow>
              ))}
          </tbody>
        </Table>

        {isLoadingList && (
          <div className="flex justify-center w-full p-3 bg-light rounded-lg">
            <StatelessLoadingSpinner />
          </div>
        )}

        <PaginationLinks
          paginatedData={usersList}
          onLinkClicked={onPaginationLinkClicked}
        />
      </Card>
    </section>
  );
}

export default UsersListView;
