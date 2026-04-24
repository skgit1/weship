# PRD — Weather Widget
*weship.today · April 2026*

## What is this?
A single weather widget that displays the current temperature, city name, and local time for one location. It has a fixed Nordic landscape illustration as the background and a dark, editorial aesthetic.

## Who is it for?
Designers and creatives who want to see what's possible — a real, live, beautifully designed thing built without writing code.

## What does it do?
- Fetches the current temperature for a chosen city using the Open-Meteo API (free, no API key needed)
- Displays: current temperature in °C, city name, country, current date and time
- Shows a loading state while fetching, and an error state if something goes wrong
- Uses the Lofoten landscape illustration as a static background

## What it does NOT do?
- No hourly or multi-day forecast
- No location detection (city is hardcoded for now)
- Illustration does not change based on weather or location
- No dark/light mode toggle
