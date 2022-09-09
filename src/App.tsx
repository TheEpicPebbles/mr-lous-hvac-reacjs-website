/** 772 335 7071
 * Port St. Lucie
 * 
 * Certainty, 
Hey Louie, my name is Juan Mancilla, I'm the Lead Front-End Developer of Pebble Labs, 

(this kind of service is a certainty)

if I can take just 5 minutes of your time to ask you some questions about your business as I genuinely want to help you thrive and succeed. 

(this is for a website for your business to reach a greater audience)

Do you have immediate access to your louieac@yahoo account? (lucky catch for the name by the way)
How is the HVAC business?
How do you normally reach your customers and how do they normally reach you? 
What kind of volume of customers do you normally get on a monthly basis?
How big is your team?
Have you ever had the problem of customers flooding your queque?

Well, I'll cut to the chase: 
I've read your reviews and can clearly see you stand out from the rest in the Port St. Lucie area would like to offer 
you a service to help you expand and reach a greater audience that google "HVAC businesses in their area"
 as I believe there is an untapped potential that can be harnessed through an exceptional frontpoint.

I've sent you an email regarding the inquiry and would like to ask you to check the website I've built
	as it's specially designed to run on desktop, Tablets, & Phones especially

and would be intrigued by hear your first, snap. impression on it.

if you would be so kind to navigate to the estimates page, I will send you an example of what it would look like to receive an inquiry through the site once
someone has filled out the respective information, (SEND IT)

there are over 200k people living in port st lucie and I aspirationally beleive that you can gather a greater market share by having an excellent website to 
persuade online customers to go to you for their needs.

I've built it custom designed for customer interaction, it's sleek design is simple and isn't cluttered with unneccessary information.

_____________________________________________________________________________________________________________

This would cost $500 + fees to finish the rest of the site as i would need xy

Things I'd need from him {
	list of services if neccessary
	licensing/insurance information if you have such things
	A typed up version of the about page **
	I would give him the login details as a sign of ownership, along with paperwork sent to show that he owns the domain
}

with a garunteed turnaround time of a week to finish the site, or your money back

and 500 once the website is completed and 35/dollars a month to keep it up and running.

_____________________________________________________________________________________________________________


you could be missing thousands of people who need maitenance and repair issues who search online. 
and by the time someone searches for hvac companies in their area from this day forward without this website, it's already too late.



Pain{
	When people look you up on google they will see how you want to present your brand, leaving a professional impression on your potential customers
	
	Commercial & Residential customers will have a better understanding thereof of what services you offer,
		they will share this when they are referring potential customers to you.
	
	It will allow you to have a much more detailed account of each customer managed through your email once they fill the form
		on the site. Giving your breathing room and more time to do your job effectively and efficiently.
	
	There is also an optional google ad package to help increase traffic to the site an extra 300 dollars to start
}

Build Rapor while simultaneously gathering information such as{
	How much money he's willing to spend on a website
	What part of having a website would make his life easier in terms of more potential income because there is a line of people who search
		on the internet for their needs, espescially in the Miami area where every edge matters.
	You already have a great following of people who go out of their way to give you reviews
}

Front (Control), Gather intelligence (specific questions about the business or prospect) 1/3 is front. 2/3 is the back, 
	Objections (smoke screens for uncertainty){
		Want to think about it
		research
		bad time of year
	}
	Increase certainty with every vowel that comes out of your mouth!
	
	Position the website as a releif for their pain

	Action threshold{
		low-easy
		high-hard
	}
	Pain Threshold{
		Verbally paint a picture as a result of using the website or customers using the site
		Truly benefit from having a structural frontpoint so that they can 
	}
	connect with {
		you
		company
		product
	}

	5{
		level of certainty about product
		level of certainty about you
		company
		action
		pain
	}


				---------------------------------------------------------------------------
(should pass the width as a parameter so that it will run it's checks) OR just have everything jumbled in one master which is probably easiest)
components{
Header
Home{
  Louie's Air Conditioning prides itself on our fast and friendly customer service. Call and schedule your maintenance today! We also provide fast emergency service on all air conditioning systems.

}
Services Available at a glance
Request A Quote
Footer
}
 * 
 * 
 */

import * as React from "react"
import {
	ChakraProvider, Grid, GridItem, Text,
} from "@chakra-ui/react"
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { About } from "./components/about";
import { Estimates } from "./components/estimates";
import { Reviews } from "./components/reviews";

export const App = () => (
  <ChakraProvider>
	  <BrowserRouter>
	  		<Routes>
				<Route path="/" element={<Home/>} />
			</Routes>
	  </BrowserRouter>
  </ChakraProvider>
)
