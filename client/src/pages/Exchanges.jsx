import { useState, useEffect } from "react";
import { exchangeService } from "../services/exchangeService";
import { FiInbox, FiSend } from "react-icons/fi";

const Exchanges = () => {
  const [activeTab, setActiveTab] = useState("incoming");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExchanges();
  }, []);

  const loadExchanges = async () => {
    try {
      const [incomingData, outgoingData] = await Promise.all([exchangeService.getIncomingExchanges(), exchangeService.getOutgoingExchanges()]);
      setIncoming(incomingData);
      setOutgoing(outgoingData);
    } catch (error) {
      console.error("Failed to load exchanges:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (exchangeId) => {
    try {
      await exchangeService.acceptExchange(exchangeId);
      loadExchanges();
      alert("Exchange accepted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept exchange");
    }
  };

  const handleReject = async (exchangeId) => {
    try {
      await exchangeService.rejectExchange(exchangeId);
      loadExchanges();
      alert("Exchange rejected");
    } catch {
      alert("Failed to reject exchange");
    }
  };

  const handleCancel = async (exchangeId) => {
    if (!window.confirm("Are you sure you want to cancel this exchange?")) return;

    try {
      await exchangeService.cancelExchange(exchangeId);
      loadExchanges();
      alert("Exchange cancelled");
    } catch {
      alert("Failed to cancel exchange");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return badges[status] || badges.pending;
  };

  const ExchangeCard = ({ exchange, type }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {type === "incoming" ? "From: " : "To: "}
            {type === "incoming" ? exchange.requester?.username : exchange.responder?.username}
          </h3>
          <p className="text-sm text-gray-500">{new Date(exchange.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(exchange.status)}`}>{exchange.status}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Books Offered:</h4>
          <ul className="space-y-1">
            {exchange.offeredBooks?.map((book) => (
              <li key={book._id} className="text-sm text-gray-600">
                • {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Books Requested:</h4>
          <ul className="space-y-1">
            {exchange.requestedBooks?.map((book) => (
              <li key={book._id} className="text-sm text-gray-600">
                • {book.title} by {book.author}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {type === "incoming" && exchange.status === "pending" && (
        <div className="flex gap-3">
          <button onClick={() => handleAccept(exchange._id)} className="flex-1 btn-primary">
            Accept
          </button>
          <button onClick={() => handleReject(exchange._id)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Reject
          </button>
        </div>
      )}

      {type === "outgoing" && exchange.status === "pending" && (
        <button onClick={() => handleCancel(exchange._id)} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Cancel Request
        </button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Exchanges</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "incoming" ? "border-b-2 border-primary-600 text-primary-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("incoming")}
        >
          <FiInbox />
          Incoming ({incoming.length})
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "outgoing" ? "border-b-2 border-primary-600 text-primary-600" : "text-gray-500 hover:text-gray-700"}`}
          onClick={() => setActiveTab("outgoing")}
        >
          <FiSend />
          Outgoing ({outgoing.length})
        </button>
      </div>

      {/* Exchange Lists */}
      <div>
        {activeTab === "incoming" ? (
          incoming.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No incoming exchange requests</div>
          ) : (
            incoming.map((ex) => <ExchangeCard key={ex._id} exchange={ex} type="incoming" />)
          )
        ) : outgoing.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No outgoing exchange requests</div>
        ) : (
          outgoing.map((ex) => <ExchangeCard key={ex._id} exchange={ex} type="outgoing" />)
        )}
      </div>
    </div>
  );
};

export default Exchanges;
