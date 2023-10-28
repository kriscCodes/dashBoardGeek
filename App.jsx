import { useState, useEffect } from 'react';
import {XAxis, YAxis, CartesianGrid, Line, LineChart} from 'recharts';
import './App.css';

function App() {
	const [events, setEvents] = useState([]);
  let chartData = []
	const clientId = 'Mzc4NjU3MzF8MTY5ODQ1NjA3MS43MDk1NTM';
	useEffect(() => {
		async function fetchData() {
				let result = await fetch(
					`https://api.seatgeek.com/2/events/?client_id=${clientId}&datetime_local=2023-11-09T19:00:00`
				);
				let data = await result.json();
				let dataEvents = data.events;
				setEvents(dataEvents);
		}
    
      fetchData();
	}, []);

  let eventStats = events.filter((event) => event.stats.average_price);
  for (let i = 0; i < eventStats.length; i++) {
    let obj = {
      eventName: eventStats[i].title,
      eventMean: eventStats[i].stats.average_price
    };
    chartData.push(obj);
  }
  console.log(chartData)
	return (
		<>
			<h1>Api Test</h1>
			{events.length == 0 ? (
				<h1>Empty</h1>
			) : (
				events.map((event) =>
					event.stats.average_price ? (
						<div key={event.id}>{event.title}</div>
					) : null
				)
			)}

		<LineChart width={600} height={300} data={chartData}>
      <Line type="monotone" dataKey="eventMean" stroke="#2196F3"></Line>
      <CartesianGrid stroke="#ccc"></CartesianGrid>
      <XAxis dataKey="eventName"></XAxis>
      <YAxis dataKey="eventMean"></YAxis>
      
    </LineChart>
		</>
	);
}

export default App;
