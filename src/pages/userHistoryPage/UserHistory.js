import moment from "moment";
import React, { useState } from "react";
import { Audio } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Badge from "../../components/Badge";
import Tr from "../../components/Tr";
import useLayout from "../../hooks/useLayout";
import useMount from "../../hooks/useMount";
import { fetchHistoryForUser } from "../../repositories/HistoryRepository";

export default function UserHistory() {
  const { setLayout } = useLayout();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [histories, setHistories] = useState([]);
  let { id } = useParams();

  const fetchData = async () => {
    let data = await fetchHistoryForUser(id).catch((error) => {
      alert(error);
      return null;
    });
    if (data) {
      console.log(data);
      setUser(data.message.user);
      setHistories(data.message.histories);
      setLoading(false);
    }
  };

  useMount(() => {
    setLayout({
      title: "Utilisateurs",
      activeMenuKeys: ["Utilisateurs"],
    });
    fetchData();
  });

  return (
    <div className="w-full h-full p-6">
      <div className="rounded-2xl bg-slate-100 w-full h-full p-6">
        {!loading && (
          <>
            <div class>
              {user.firstname} {user.lastname}
            </div>
            <table className="w-full mt-10 bg-slate-100">
              <thead>
                <tr className="bg-slate-300">
                  <th className="text-left pl-6">Date</th>
                  <th className="text-left pl-6">Accès</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((history) => {
                  return (
                    <Tr key={history.id}>
                      <td className="pl-6">
                        {moment
                          .unix(history.createdAt?.timestamp)
                          .locale("fr")
                          .format("LL à hh:mm")}
                      </td>
                      <td className="pl-6">
                        {history.unlocked ? (
                          <Badge color="success" label="Authorisé" />
                        ) : (
                          <Badge color="danger" label="Non Authorisé" />
                        )}
                      </td>
                    </Tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {loading && (
          <div className="flex flex-col h-full items-center justify-center m-auto">
            <Audio
              height="80"
              width="80"
              radius="9"
              color="red"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
            Chargement...
          </div>
        )}
      </div>
    </div>
  );
}
