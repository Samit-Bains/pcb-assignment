"use client";

import { useState } from "react";

const classes = {
	container: {
		marginTop: "3rem",
		textAlign: "center",
		fontFamily: "sans-serif",
	},
	header: {
		marginBottom: "1rem",
		fontWeight: "bold",
		fontSize: "1.5rem",
	},
	form: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		gap: "0.5rem",
		flexWrap: "wrap",
	},
	textBox: {
		border: "1px solid #ccc",
		padding: "0.5rem",
		borderRadius: "0.25rem",
		minWidth: "200px",
	},
	searchButton: (enabled) => ({
		backgroundColor: "#3B82F6",
		color: "white",
		padding: "0.5rem 1rem",
		borderRadius: "0.25rem",
		cursor: enabled ? "pointer" : "not-allowed",
		opacity: enabled ? 1 : 0.5,
		border: "none",
	}),
	result: {
		marginTop: "3rem",
		marginLeft: "auto",
		marginRight: "auto",
		border: "1px solid #000",
		padding: "1rem",
		borderRadius: "0.25rem",
		display: "inline-block",
		textAlign: "left",
		fontFamily: "monospace",
		whiteSpace: "pre-wrap",
	},
};

export default function TrackShipment() {
	const [jobId, setJobId] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const isEnabled = jobId.trim() !== "";

	const handleSearch = async () => {
		if (!isEnabled) return; // extra safety

		setLoading(true);
		setResult(null);

		try{
			const res = await fetch(`/api/job/${jobId}`);
			const data = await res.json();
			setResult(data);
		} catch (err){
			setResult({ error: "Failed to fetch data" });
		} finally {
			setLoading(false);
		}
	};

  return (
	<div style={classes.container}>
		<h1 style={classes.header}>Track Shipment</h1>
		<div style={classes.form}>
			<input
				style={classes.textBox}
				value={jobId}
				onChange={(e) => setJobId(e.target.value)}
				placeholder="Enter Job ID"
			/>
			<button
				style={classes.searchButton(isEnabled)}
				onClick={handleSearch}
				disabled={!isEnabled}
			>
				Search
			</button>
		</div>
		{loading && <p style={{marginTop: '3rem'}}>Loading...</p>}
		{result && (
			<div style={classes.result}>
				{result.error ? (
					<p style={{ color: "red" }}>{result.error}</p>
				) : (
					<>
						<p>Job: {result.job}</p>
						<p>Shipment: {result.shipment}</p>
						<p>Status: {result.status}</p>
						<p>Latitude: {result.latitude}</p>
						<p>Longitude: {result.longitude}</p>
					</>
				)}
			</div>
		)}
	</div>
  );
}
