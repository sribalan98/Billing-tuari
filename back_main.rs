// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command; // <-- Add this line
use std::process::Stdio;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {

    // Running the Node.js + Express server when the Tauri app starts
    let _nodejs_server = Command::new("node")
        .arg("../Server/server.js")  // Adjust the path if necessary
        .stdout(Stdio::inherit())    // Inherit stdout to see logs
        .stderr(Stdio::inherit())    // Inherit stderr to see errors
        .spawn()                     // Spawn the process to run in the background
        .expect("Failed to start Node.js + Express server");


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
