import { useEffect, useState } from "react";
import { getDashboardData } from "../../service/DashboardService";
import "./Dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async ()=>{
    try{
      const response = await getDashboardData();
      if(response.status === 200){
        setOrders(response.data);
      }
    }catch(e){
      console.error(e);
    }finally{
      setLoading(false);
    }
  }
  
  const formatDate = (dateString)=>{
      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
      }
      return new Date(dateString).toLocaleDateString('en-US', options);
  }

  if(loading){
    return <div>Dashboard Loading ......</div>;
  }
  
  return (
    <div className='dashboard-wrapper dashboard-container'>
      <div className="d-flex gap-2">
        <div className="d-flex gap-3 smallcard p-4 rounded justify-content-start align-items-center">
          <div className="icon border-success"><i className="bi bi-currency-rupee"></i></div>
          <div>
            <h6 className="desc">Today's Sales</h6>
            <span className="data"><i className="bi bi-currency-rupee"></i>{orders.todaySales}</span>
          </div>
        </div>
        <div className="d-flex gap-3 smallcard p-4 rounded justify-content-start align-items-center">
          <div className="icon border-success"><i className="bi bi-cart-check"></i></div>
          <div>
            <h6 className="desc">Today's Orders</h6>
            <span className="data ms-2">{orders.todayOrderCount}</span>
          </div>
        </div>
      </div>
      <div className="recent-orders-container rounded p-4">
        <div className="d-flex justify-content-start align-items-center gap-4 p-2">
          <i className="bi bi-clock-history recent-icon"></i>
          <h2>Recent Orders</h2>
        </div>
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Order Id</th>
                        <th>Custormer</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody className="table-dark">
                    {
                        orders?.recentOrders?.map(order=>{
                            return <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerName}</td>
                                <td><i className="bi bi-currency-rupee"></i>{order.grandTotal}</td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <span className={`badge ${order.paymentDetails?.status==="COMPLETED"? "bg-success": "bg-warning text-dark"}`}>{order.paymentDetails?.status || "PENDING"}</span>
                                </td>
                                <td>{formatDate(order.createdAt)}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard