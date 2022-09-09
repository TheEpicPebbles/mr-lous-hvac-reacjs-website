/**
 * TODO:
 * 	-Add services
 * 	-fix icons
 * 	-Fix display font
 * 	-add button route on logo
 * 	-add review api point
 * 	-finish footer
 * 	-of course finally add mobile support 
 * 
 */

import { 
	Accordion, 
	Grid, 
	GridItem,
	Image,
	Flex,
	Text, 
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Divider,
	Badge,
	useDisclosure,
	Collapse,
	UnorderedList,
	ListItem,
	useToast,
	Input,
	InputGroup,
	InputLeftElement,
	CheckboxGroup,
	Checkbox,
	Textarea
} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react'

import emailjs from "emailjs-com";

import { RiMailFill, RiMailSendLine } from "react-icons/ri";
import { FaFacebook, FaHome, FaPhone, FaSearchLocation, FaUser} from "react-icons/fa";
import { GiModernCity } from 'react-icons/gi'
import { AiFillStar, AiOutlineCopyrightCircle } from "react-icons/ai";
import { GrContactInfo } from 'react-icons/gr'

import "@fontsource/inter";
import "../SCSS/main.scss";
import "../SCSS/estimatesPage.scss";

import { IconContext } from "react-icons";
import { IoIosCall } from "react-icons/io";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const Home = () => {
	const [showDesktop, setDesktop] = useState(null)
	const [showTablet, setTablet] = useState(null)
	const [showMobile, setMobile] = useState(null)
	const [backgroundColor, setBackgroundColor] = useState("#78B2E0");
	const [logo, setLogo] = useState("");
	const { isOpen, onToggle } = useDisclosure()


	const [custName, setCustName] = useState("")
	const [custPhoneNum, setCustPhoneNum] = useState("")
	const [custEmail, setCustEmail] = useState("")
	const [custAddress, setCustAddress] = useState("")
	const [custCity, setCustCity] = useState("")
	const [custZip, setCustZip] = useState("")
	const [custMessage, setCustMessage] = useState("")
	const [custAvailabilityWeekDays, setCustAvailabilityWeekDays] = useState("")
	const [custAvailabilityWeekENDS, setCustAvailabilityWeekENDS] = useState("")


	//true is false, false is true in the intuitive sense. but for some reason the UI just works starting at a false positive
	const [weekDayState, setWeekDayState] = useState(true)
	const [weekDayID, setWeekDayID] = useState("weekDayButton")

	const [weekEndState, setWeekEndState] = useState(true)
	const [weekEndID, setWeekEndID] = useState("weekEndButton")

	const [SundayState, setSundayState] = useState(true)
	const [SundayID, setSundayID] = useState("SundayButton")

	const [MondayState, setMondayState] = useState(true)
	const [MondayID, setMondayID] = useState("MondayButton")

	const [TuesdayState, setTuesdayState] = useState(true)
	const [TuesdayID, setTuesdayID] = useState("TuesdayButton")

	const [WednesdayState, setWednesdayState] = useState(true)
	const [WednesdayID, setWednesdayID] = useState("WednesdayButton")

	const [ThursdayState, setThursdayState] = useState(true)
	const [ThursdayID, setThursdayID] = useState("ThursdayButton")

	const [FridayState, setFridayState] = useState(true)
	const [FridayID, setFridayID] = useState("FridayButton")

	const [SaturdayState, setSaturdayState] = useState(true)
	const [SaturdayID, setSaturdayID] = useState("SaturdayButton")

	const [buttonSubmitQM, setButtonSubmitQM] = useState(false)

	const [mornings, setMornings] = useState(false)
	const [afternoons, setAfternoons] = useState(false)
	const [evenings, setEvenings] = useState(false)

	let changeMornings = () => {
		setMornings(!mornings)
		console.log(mornings)
	}
	let changeAfternoons = () => {
		setAfternoons(!afternoons)
		console.log(afternoons)
	}
	let changeEvenings = () => {
		setEvenings(!evenings)
		console.log(evenings)
	}

	let finalCheck = () => {
		if (weekDayState) {
			setCustAvailabilityWeekDays("Anytime on the Weekdays (Mon-Fri)")
		} else {
			if (MondayState == true && TuesdayState == true && WednesdayState == true && ThursdayState == true && FridayState == true) {
				setCustAvailabilityWeekDays("Not Available on the Weekdays(Mon-Fri)")
			} else {
				setCustAvailabilityWeekDays("Available on ")
				if (MondayState == false) {
					setCustAvailabilityWeekDays(custAvailabilityWeekDays + "Mondays | ")
				}
				if (TuesdayState == false) {
					setCustAvailabilityWeekDays(custAvailabilityWeekDays + "Tuesdays | ")
				}
				if (WednesdayState == false) {
					setCustAvailabilityWeekDays(custAvailabilityWeekDays + "Wednesdays | ")
				}
				if (ThursdayState == false) {
					setCustAvailabilityWeekDays(custAvailabilityWeekDays + "Thursdays | ")
				}
				if (FridayState == false) {
					setCustAvailabilityWeekDays(custAvailabilityWeekDays + "Fridays | ")
				}
			}
		}
		if (weekEndState) {
			setCustAvailabilityWeekENDS("Anytime on the Weekends(Sat-Sun)")
		} else {
			if (SundayState == true && SaturdayState == true) {
				setCustAvailabilityWeekENDS("Not Available on the Weekends(Sat-Sun)")
			} else {
				if (SundayState == false) {
					setCustAvailabilityWeekENDS("Available on Sundays")
				}
				if (SaturdayState == false) {
					setCustAvailabilityWeekENDS("Available on Saturdays")
				}
			}
		}

		if (mornings) {
			setMornings("Morning (8AM-10AM)")
		} else {
			setMornings("NOT Available in the Morning (8AM-10AM)")
		}
		if (evenings) {
			setEvenings("Evening (10AM-12PM)")
		} else {
			setEvenings("NOT Available in the Evening (10AM-12PM)")
		}
		if (afternoons) {
			setAfternoons("Afternoon (12PM-5PM)")
		} else {
			setAfternoons("NOT Available in the Afternoon (12PM-5PM)")
		}
	}

	const toast = useToast()
	let submitForm = (e) => {
		if (custName.length > 0 && custPhoneNum.length > 0 && custAddress.length > 0 && custCity.length > 0 && custZip.length > 0 && custMessage.length > 0) {
			setButtonSubmitQM(true);

			finalCheck();

			console.log(custName + "  " + custPhoneNum + "  " + custEmail + "  " + custAddress + "   " + custCity + "   " + custZip + "   " + custMessage + "  " + custAvailabilityWeekDays + "  " + custAvailabilityWeekENDS)

			e.preventDefault();
			var templateParams = {
				from_name: custName,
				simpmessage: custMessage,
				phone: custPhoneNum,
				zipcode: custZip,
				city: custCity,
				address: custAddress,
				reply_to: custEmail,
				availweekdays: custAvailabilityWeekDays,
				availweekends: custAvailabilityWeekENDS,
				morning: mornings,
				evening: evenings,
				afternoon: afternoons
			}
			emailjs.send("service_ryqisf5", "template_yj4owaj", templateParams, "Y2Xa0_hZNxYcxMb9H")
				.then((result) => {
					setTimeout(() => {
						setCustName("")
						setCustPhoneNum("")
						setCustEmail("")
						setCustAddress("")
						setCustCity("")
						setCustZip("")
						setCustMessage("")
						setCustAvailabilityWeekDays("")
						setCustAvailabilityWeekENDS("")
						setMornings(false)
						setAfternoons(false)
						setEvenings(false)
						setButtonSubmitQM(false);
						toast({
							title: `Inquiry Sent Successfully!`,
							status: "success",
							isClosable: true,
						})
					}, 1000);
				}, (error) => {
					toast({
						title: `Inquiry Not Sent, Please Try Again Later...`,
						status: "error",
						isClosable: true,
					})
				});
		} else {
			toast({
				title: `Please Fill Remaining Fields`,
				status: "warning",
				isClosable: true,
			})
			return;
		}
	}

	/**
	 * emailjs.send("service_ryqisf5","template_yj4owaj",{
		from_name: "Juan Mancilla",
		simpmessage: "I'd like a maintenance done for my old air conditioner unit, along with new ducts installed",
		phone: "6306317914",
		address: "943 Autumn Lane",
		zipcode: "60505",
		reply_to: "theepicpebbles0000@gmail.com",
		});
	 */
	let changeName = (value) => {
		setCustName(value);
	}
	let changePhoneNum = (value) => {
		//do some fuck shit 
		// (xxx)xxx-xxx
		//(2 _ _) _ _ _ - _ _ _ _
		setCustPhoneNum(value);
	}
	let changeEmail = (value) => {
		setCustEmail(value);
	}
	let changeAddress = (value) => {
		setCustAddress(value);
	}
	let changeCity = (value) => {
		setCustCity(value);
	}
	let changeZip = (value) => {
		setCustZip(value);
	}
	let changeMessage = (value) => {
		setCustMessage(value)
	}

	let changeWeekdayButtonState = () => {
		setWeekDayState(!weekDayState);
		console.log(weekDayState)
		if (weekDayState) {
			setWeekDayID("weekDayButtonACTIVE")
			setMondayState(false)
			setTuesdayState(false)
			setWednesdayState(false)
			setThursdayState(false)
			setFridayState(false)
			setMondayID("MondayButtonACTIVE")
			setTuesdayID("TuesdayButtonACTIVE")
			setWednesdayID("WednesdayButtonACTIVE")
			setThursdayID("ThursdayButtonACTIVE")
			setFridayID("FridayButtonACTIVE")

		} else {
			setWeekDayID("weekDayButton")
			setMondayState(true)
			setTuesdayState(true)
			setWednesdayState(true)
			setThursdayState(true)
			setFridayState(true)
			setMondayID("MondayButton")
			setTuesdayID("TuesdayButton")
			setWednesdayID("WednesdayButton")
			setThursdayID("ThursdayButton")
			setFridayID("FridayButton")
		}
		console.log(weekDayID)
	}
	let changeWeekEndButtonState = () => {
		setWeekEndState(!weekEndState);
		console.log(weekEndState)
		if (weekEndState) {
			setWeekEndID("weekEndButtonACTIVE")
			setSundayState(false)
			setSaturdayState(false)
			setSundayID("SundayButtonACTIVE")
			setSaturdayID("SaturdayButtonACTIVE")

		} else {
			setWeekEndID("weekEndButton")
			setSundayState(true)
			setSaturdayState(true)
			setSundayID("SundayButton")
			setSaturdayID("SaturdayButton")

		}
		console.log(weekDayID)
	}
	let changeSundayButtonState = () => {
		setSundayState(!SundayState);
		if (SundayState) {
			setSundayID("SundayButtonACTIVE")
			if (SaturdayState == false) {
				setWeekEndState(false)
				setWeekEndID("weekEndButtonACTIVE")
			}
		} else {
			setSundayID("SundayButton")
			setWeekEndState(true)
			setWeekEndID("weekEndButton")
		}
	}
	let changeMondayButtonState = () => {
		setMondayState(!MondayState);
		if (MondayState) {
			setMondayID("MondayButtonACTIVE")
			if (TuesdayState == false && WednesdayState == false && ThursdayState == false && FridayState == false) {
				setWeekDayState(false)
				setWeekDayID("weekDayButtonACTIVE")
			}
		} else {
			setMondayID("MondayButton")
			setWeekDayState(false)
			setWeekDayID("weekDayButton")
		}
	}
	let changeTuesdayButtonState = () => {
		setTuesdayState(!TuesdayState);
		if (TuesdayState) {
			setTuesdayID("TuesdayButtonACTIVE")
			if (MondayState == false && WednesdayState == false && ThursdayState == false && FridayState == false) {
				setWeekDayState(false)
				setWeekDayID("weekDayButtonACTIVE")
			}
		} else {
			setTuesdayID("TuesdayButton")
			setWeekDayState(false)
			setWeekDayID("weekDayButton")
		}
	}
	let changeWednesdayButtonState = () => {
		setWednesdayState(!WednesdayState);
		if (WednesdayState) {
			setWednesdayID("WednesdayButtonACTIVE")
			if (MondayState == false && TuesdayState == false && ThursdayState == false && FridayState == false) {
				setWeekDayState(false)
				setWeekDayID("weekDayButtonACTIVE")
			}
		} else {
			setWednesdayID("WednesdayButton")
			setWeekDayState(false)
			setWeekDayID("weekDayButton")
		}
	}
	let changeThursdayButtonState = () => {
		setThursdayState(!ThursdayState);
		if (ThursdayState) {
			setThursdayID("ThursdayButtonACTIVE")
			if (MondayState == false && TuesdayState == false && WednesdayState == false && FridayState == false) {
				setWeekDayState(false)
				setWeekDayID("weekDayButtonACTIVE")
			}
		} else {
			setThursdayID("ThursdayButton")
			setWeekDayState(false)
			setWeekDayID("weekDayButton")
		}
	}

	let changeFridayButtonState = () => {
		setFridayState(!FridayState);
		if (FridayState) {
			setFridayID("FridayButtonACTIVE")
			if (MondayState == false && TuesdayState == false && WednesdayState == false && ThursdayState == false) {
				setWeekDayState(false)
				setWeekDayID("weekDayButtonACTIVE")
			}
		} else {
			setFridayID("FridayButton")
			setWeekDayState(false)
			setWeekDayID("weekDayButton")
		}
	}
	let changeSaturdayButtonState = () => {
		setSaturdayState(!SaturdayState);
		if (SaturdayState) {
			setSaturdayID("SaturdayButtonACTIVE")
			if (SundayState == false) {
				setWeekEndState(false)
				setWeekEndID("weekEndButtonACTIVE")
			}
		} else {
			setSaturdayID("SaturdayButton")
			setWeekEndState(true)
			setWeekEndID("weekEndButton")
		}
	}

	let openServices = () =>{
		setTimeout(() => {
			onToggle()
		}, 500);
	}

	let updateDimensions = () => {
		if (window.innerWidth > 1100) {
			setDesktop(true)
			setMobile(false)
			setTablet(false)
		} else if (window.innerWidth > 700) {
			setTablet(true)
			setDesktop(false)
			setMobile(false)

		} else if (window.innerWidth < 700) {
			setMobile(true)
			setTablet(false)
			setDesktop(false)
		}
		console.log(window.innerWidth + " " + window.innerHeight)
	}

	useEffect(() => {
		updateDimensions()
		window.addEventListener("resize", updateDimensions);
	}, []);

	return(
		<>
			{showDesktop ? 
			<>
					<Grid
						height={"100%"}
						width={"100%"}
						bg={"white"}
						justifyContent={"center"}
						color={"black"}
						display={"block"}>
						<GridItem display={"flex"} flexDir={"row"} justifyContent={"center"} p={1} bg={backgroundColor} width={"100%"}>
							<Flex width={"1100px"} justifyContent={"space-between"}>
								<Button variant={"ghost"} rounded={"full"}>
									<Image src='/Google_Maps_icon.png' boxSize={8} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3} mr={1} />
									<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
										139 Wolf's Crossing Rd | Oswego | IL 60543
									</a>
								</Button>
								<Button variant={"ghost"} rounded={"full"}>
									<a href="mailto:mrloushvac@gmail.com" target={"_blank"}>
										<Flex>
											<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>mrloushvac@gmail.com</Text>
										</Flex>
									</a>
								</Button>
								<Button variant={"ghost"} rounded={"full"} >
									<a href='tel:+13315887681' target={"_blank"} >
										<Flex>
											<Flex p={1}><IoIosCall size={"22px"} /></Flex> <Text p={1}>(331)588-7681</Text>
										</Flex>
									</a>
								</Button>
								<Flex>
									<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
										<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
											<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
												<FaFacebook />
											</IconContext.Provider>
										</a>
									</Button>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
							<Link to={"/"} width={"800px"}>
								<Flex justifyContent={"center"} bg="whitesmoke">
									<Image src='/logo.png' boxSize={"160px"} borderRadius={"full"} border={"2px"} shadow={"0px 0px 5px 2px black"}/>
									<Image src='/CompanyNameLogo1.png' width={"320px"} objectFit={"contain"} />
									<Flex flexDir={"column"} paddingTop={10}>
										<Flex justifyContent={"center"}>
											<Image src='/air.png' width={"125px"} objectFit={"contain"} />
										</Flex>
										<Image src='/conditioning.png' width={250} objectFit={"contain"} />
									</Flex>
								</Flex>
							</Link>

							<Flex justifyContent={"center"}>
								<Flex justifyContent={"space-between"} width={"1100px"}>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Accordion color={"black"} allowToggle allowMultiple width={"100%"}>
										<AccordionItem>
											<AccordionButton mt={"-5px"} width={"100%"}>
												< Button variant='none' colorScheme={"black"} onClick={() => openServices()} width={"100%"} background={backgroundColor}>
													<Text>Quality Services</Text> <AccordionIcon float={"right"} />
												</Button>
											</AccordionButton>
											<AccordionPanel position={"absolute"} bg={"white"} width={"1090px"} justifyContent={"center"} roundedBottom={3} zIndex={3} boxShadow={"0px 15px 23px 0px rgba(0,0,0,0.75)"}>
												<Collapse in={isOpen} animateOpacity>
													<Grid
													templateColumns={"repeat(2,1fr)"}
														templateRows={"repeat(2,1fr)"}
														border={"1px"} rounded={6}
														>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/ductwork.jpg"} rounded={3} color={"white"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} rounded={3} p={2}>
																<Text fontSize={"36px"}>Ductwork/Ventilation</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Ventilation & Ductwork Installation
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Repair
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Maintenance
																	</ListItem>
																	<ListItem>
																		Crawl Space Ventilation Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/AC_UNIT.jpg"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"36px"} textAlign={"center"}>HVAC</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		HVAC Inspection
																	</ListItem>
																	<ListItem>
																		Thermostat Replacement & Repair
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Maintenance
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Repair
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Maintenance
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Repair
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Installation
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Replacement & Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"smart-thermostat-hand.jpg"} backgroundSize="cover">
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"36px"} >Heating / Gas</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Furnance Maintenance
																	</ListItem>
																	<ListItem>
																		Geothermal Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heating Installation
																	</ListItem>
																	<ListItem>
																		Gas Applicance Installation
																	</ListItem>
																	<ListItem>
																		Gas Pipe Installation
																	</ListItem>
																	<ListItem>
																		Gas Leak Detection
																	</ListItem>
																	<ListItem>
																Gas Leak Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"wh-repair.jpg"} backgroundSize="cover" >
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"36px"}>Water Heaters</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Water Heater Inspection
																	</ListItem>
																	<ListItem>
																		Water Heater Repair
																	</ListItem>
																	<ListItem>
																		Water Line Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
													</Grid>
												</Collapse>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Divider bg="black" />
							<Divider bg="black" />

							<Image src='/air-conditioner.jpg' position={"absolute"} className="noselect" />
							<Flex justifyContent={"center"} position={"absolute"} width={"100%"}>
								<Grid
									templateColumns={"repeat(2,1fr)"}
									templateRows={"repeat(2,1fr)"}
									width={"100%"}
								>
									<GridItem justifyContent={"center"} p={6}>
										<Flex>
											<Text bg={"white"} p={1} rounded={3} fontSize={26} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"}>Liscened & Insured</Text>
										</Flex>
									</GridItem>
									<GridItem justifyContent={"center"} p={6}>
										<Flex float={"right"}>
											<Text textAlign={"right"} bg={"white"} p={1} rounded={3} fontSize={26} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"}>Family Owned</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan={2} justifyContent={"center"} alignContent={"flex-end"} mt={"10%"}>
										<Flex justifyContent={"center"} >
											<Text textAlign={"center"} bg={"white"}><Button boxShadow={"0px 2px 4px 2px"} fontFamily={"Inter"}>Schedule Your Maitenence Below!</Button></Text>
										</Flex>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem mt={"30%"}>
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"1000px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Mr. Lou prides on fast and friendly customer
									service. Schedule your maintenance below! We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem justifyContent={"center"} display={"flex"}>
							<Flex flexDir={"column"} width={"1100px"}>
								<form>
									<Flex justifyContent={"center"}>
										<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}>your Contact Information &nbsp; <GrContactInfo size={30} /></Badge>
									</Flex>
									<Grid
										templateColumns={"repeat(2,1fr)"}
									>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaUser color='white' />
												</InputLeftElement>
												<Input placeholder='Full Name' bg={"#222"} color={"white"} isRequired required onChange={(event) => changeName(event.target.value)} value={custName} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaPhone color='white' />
												</InputLeftElement>
												<Input placeholder='Phone Number (xxx)xxx-xxxx' bg={"#222"} color={"white"} type={"number"} required onChange={(event) => changePhoneNum(event.target.value)} value={custPhoneNum} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<RiMailFill color='white' />
												</InputLeftElement>
												<Input placeholder='Email' bg={"#222"} color={"white"} onChange={(event) => changeEmail(event.target.value)} value={custEmail} required isRequired />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<Grid templateColumns={"repeat(3,1fr)"}>
												<GridItem width={250}>
													<InputGroup>
														<InputLeftElement>
															<FaHome color='white' />
														</InputLeftElement>
														<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} isRequired required />
													</InputGroup>
												</GridItem>
												<GridItem>
													<InputGroup>
														<InputLeftElement>
															<GiModernCity color='white' size={26} />
														</InputLeftElement>
														<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} isRequired required />
													</InputGroup>
												</GridItem>
												<GridItem>
													<InputGroup>
														<InputLeftElement>
															<FaSearchLocation color='white' />
														</InputLeftElement>
														<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} isRequired required />
													</InputGroup>
												</GridItem>
											</Grid>

										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={20}>When Are you Available?</Badge>
											</Flex>
											<Flex justifyContent={"center"} height={65}>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekdayButtonState()} id={weekDayID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekdays</Text>
													<Text textAlign={"center"} fontSize={12}>(Mon-Fri)</Text>
												</Button>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekEndButtonState()} id={weekEndID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekends</Text>
													<Text textAlign={"center"} fontSize={12}>(Sat-Sun)</Text>
												</Button>
											</Flex>
											<Flex justifyContent={"center"} pt={3}>
												<Accordion allowToggle>
													<AccordionItem>
														<AccordionButton justifyContent={"center"} bg={"#78B2E0"} rounded={6}>
															Change availability for specific days and time periods
															<AccordionIcon />
														</AccordionButton>
														<AccordionPanel>
															<Flex>
																<InputGroup>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeSundayButtonState()} id={SundayID}>
																		Sunday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeMondayButtonState()} id={MondayID}>
																		Monday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeTuesdayButtonState()} id={TuesdayID}>
																		Tuesday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeWednesdayButtonState()} id={WednesdayID}>
																		Wednesday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeThursdayButtonState()} id={ThursdayID}>
																		Thursday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeFridayButtonState()} id={FridayID}>
																		Friday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeSaturdayButtonState()} id={SaturdayID}>
																		Saturday
																	</Button>
																</InputGroup>
															</Flex>
															<Flex color={"whiteAlpha.900"} justifyContent={"center"} m={3}>
																<CheckboxGroup>
																	<Flex display={"flex"} flexDir={"column"}>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeMornings()}>
																			Morning (8AM-10AM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeEvenings()}>
																			Evening (10AM-12PM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={() => changeAfternoons()}>
																			Afternoon (12PM-5PM)
																		</Checkbox>
																	</Flex>
																</CheckboxGroup>
															</Flex>
															<Divider bg={"black"} mt={1} />
															<Divider bg="black" />

														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											</Flex>
										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"} pt={2}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={24}>How Can We Help?</Badge>
											</Flex>
											<Textarea onChange={(event) => changeMessage(event.target.value)} value={custMessage} bg={"#222"} color={"white"} isRequired>

											</Textarea>
										</GridItem>
										<GridItem colSpan={2} p={3} display={"flex"} justifyContent={"end"}>
											<Button bg={backgroundColor} isLoading={buttonSubmitQM} loadingText='Submitting Request' onClick={(e) => submitForm(e)} type={"submit"}>Submit</Button>
										</GridItem>
									</Grid>
								</form>
							</Flex>
						</GridItem>
						<GridItem display={"flex"} justifyContent={"center"}>
							<Flex flexDir={"column"} width={"1100px"}>

							<Grid templateColumns={"repeat(2,1fr)"}
								templateRows={"repeat(1,1fr)"}
									textAlign={"center"}>
								<GridItem
									//bg={"slategray"} 
									roundedBottomLeft={6} alignSelf={"center"}
									h={"100%"} >

									<Text bg={"#333"} color={"white"} roundedTopLeft={3} p={2}>Where I serve in the greater Chicago land area:</Text>
									<Grid
										templateColumns={"repeat(3,1fr)"}
										templateRows={"repeat(1,1fr)"}
										border={"1px"}
										roundedBottomLeft={6}
											h={"440px"} >
										<GridItem borderRight={"1px"}
										>
											<UnorderedList listStyleType={"none"}>
												<ListItem >
													<Badge colorScheme={"black"} fontSize={18}>
														Elburn
													</Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Geneva
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Glen Ellyn
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Maple Park
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Saint Charles
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Wayne
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														West Chicago
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Wheaton
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Carol Stream
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Winfield
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Crest Hill
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Shorewood
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Channahon
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Joliet
													</ Badge>
												</ListItem>

											</UnorderedList>
										</GridItem>

										<GridItem borderRight={"1px"}>
											<UnorderedList listStyleType={"none"}>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Bolingbrook
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Lockport
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Romeoville
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Minooka
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Aurora
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Batavia
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Big Rock
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Bristol
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Downers Grove
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Woodridge
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Hinckley
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Lisle
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Montgomery
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Mooseheart
													</ Badge>
												</ListItem>
											</UnorderedList>
										</GridItem>
										<GridItem>
											<UnorderedList listStyleType={"none"}>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Naperville
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Newark
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														North Aurora
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Oswego
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Plainfield
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Plano
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Sandwich
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Somonauk
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Sugar Grove
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Warrenville
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Yorkville
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Darien
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Fox Valley
													</ Badge>
												</ListItem>
												<ListItem>
													<Badge colorScheme={"black"} fontSize={18}>
														Lemont
													</ Badge>
												</ListItem>
											</UnorderedList>
										</GridItem>
									</Grid>

								</GridItem>

								<GridItem bg={"slategray"} roundedBottomRight={6}>
									<Flex justifyContent={"center"} rounded={6}>
										<iframe title="MrLousServiceMap" src="https://www.google.com/maps/d/u/0/embed?mid=1HtJi_5obeT-Hgzgmf-KMoGks9mnLIUdE&ehbc=2E312F" width="640" height="480"></iframe>
									</Flex>
								</GridItem>
							</Grid>
							</Flex>
						</GridItem>
						<GridItem bg={"#222"}>
							<Flex justifyContent={"center"}>
								<Grid
									color={"white"}
									templateColumns={"repeat(4,1fr)"}
									pt={6}>
									<GridItem p={"50px"}>
										<Text textAlign={"left"}>
											<b>Mr. Lou's HVAC & Handyman Services</b> <br />
											139 Wolf's Crossing Rd <br />
											Oswego, IL 60543<br />
											(331) 588-7681<br />
											Monday-Friday:<br />
											Saturday-Sunday: <br />
										</Text>
									</GridItem>
									<GridItem p={"50px"}>
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.147533850225!2d-88.26621944894055!3d41.69575068468268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef13d00fbfc1b%3A0x1351be14f52adba!2s139%20Wolf%E2%80%99s%20Crossing%20Rd%2C%20Oswego%2C%20IL%2060543!5e0!3m2!1sen!2sus!4v1651770438895!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
									</GridItem>
									<GridItem p={"50px"}>
										<Flex justifyContent={"center"}>
											<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
												<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
													<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
														<FaFacebook />
													</IconContext.Provider>
												</a>
											</Button>
											<Button variant={"ghost"} rounded={"full"} _hover={{ bg: "whitesmoke" }}>
												<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
													<Image src='/Google_Maps_icon.png' boxSize={9} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3}/>
												</a>
											</Button>
										</Flex>
									</GridItem>
									<GridItem p={"50px"}>
										<UnorderedList>
											<ListItem>
												<Button variant={"link"}><u><Link to={"/"}>Home</Link></u></Button>
											</ListItem>
										</UnorderedList>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem bg={"#111"}
							color={"white"}>
							<Flex justifyContent={"center"} fontFamily={"Inter"} padding={2}>
								<Flex paddingTop={1}>
									<AiOutlineCopyrightCircle size={24}/>
								</Flex>
								<Text paddingTop={2}>
									&nbsp; COPYRIGHT MR. LOU'S HVAC & HANDYMAN SERVICES | 331-588-7681 | SITE CREATED BY &nbsp;
								</Text>
								<Button border={"1px"} borderColor={"green.500"} bg={"#222"}>
									<a target={"_blank"} href={"https://theepicpebbles.github.io"}>
										🪨 Pebble Labs 🧪
									</a>
								</Button>
							</Flex>
						</GridItem>
					</Grid>
			</> 
			: <></>}
			{showTablet ? 
			<>
					<Grid
						height={"100%"}
						width={"100%"}
						bg={"white"}
						justifyContent={"center"}
						color={"black"}
						display={"block"}>
						<GridItem display={"flex"} flexDir={"row"} justifyContent={"center"} p={1} bg={backgroundColor} width={"100%"}>
							<Flex width={"700px"} justifyContent={"space-between"}>
								
								<Button variant={"ghost"} rounded={"full"}>
									<a href="mailto:mrloushvac@gmail.com" target={"_blank"}>
										<Flex>
											<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>mrloushvac@gmail.com</Text>
										</Flex>
									</a>
								</Button>
								<Button variant={"ghost"} rounded={"full"} >
									<a href='tel:+13315887681' target={"_blank"} >
										<Flex>
											<Flex p={1}><IoIosCall size={"22px"} /></Flex> <Text p={1}>(331)588-7681</Text>
										</Flex>
									</a>
								</Button>
								<Flex>
									<Button variant={"ghost"} rounded={"full"}>
										<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
											<Image src='/Google_Maps_icon.png' boxSize={8} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3} mr={1} />
										</a>
									</Button>
									<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
										<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
											<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
												<FaFacebook />
											</IconContext.Provider>
										</a>
									</Button>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
							<Link to={"/"} width={"700px"}>
								<Flex justifyContent={"center"} bg="whitesmoke">
									<Image src='/logo.png' boxSize={"160px"} borderRadius={"full"} border={"2px"} shadow={"0px 0px 5px 2px black"}/>
									<Image src='/CompanyNameLogo1.png' width={"320px"} objectFit={"contain"} />
									<Flex flexDir={"column"} paddingTop={10}>
										<Flex justifyContent={"center"} > 
											<Image src='/air.png' width={"150px"} objectFit={"contain"} />
										</Flex>
										<Image src='/conditioning.png' width={250} objectFit={"contain"} />

									</Flex>
								</Flex>
							</Link>

							<Flex justifyContent={"center"}>
								<Flex justifyContent={"space-between"} width={"685px"}>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Accordion color={"black"} allowToggle allowMultiple width={"100%"}>
										<AccordionItem>
											<AccordionButton mt={"-5px"} width={"100%"}>
												< Button variant='none' colorScheme={"black"} onClick={() => openServices()} width={"100%"} background={backgroundColor}>
													<Text>Quality Services</Text> <AccordionIcon float={"right"} />
												</Button>
											</AccordionButton>
											<AccordionPanel position={"absolute"} bg={"white"} width={"680px"} justifyContent={"center"} roundedBottom={3} zIndex={3} boxShadow={"0px 15px 23px 0px rgba(0,0,0,0.75)"}>
												<Collapse in={isOpen} animateOpacity>
													<Grid
													templateColumns={"repeat(2,1fr)"}
														templateRows={"repeat(2,1fr)"}
														border={"1px"} rounded={6}
														>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/ductwork.jpg"} rounded={3} color={"white"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} rounded={3} p={2} h={"50%"}>
																<Text fontSize={"36px"}>Ductwork/Ventilation</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Ventilation & Ductwork Installation
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Repair
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Maintenance
																	</ListItem>
																	<ListItem>
																		Crawl Space Ventilation Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/AC_UNIT.jpg"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"36px"} textAlign={"center"}>HVAC</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		HVAC Inspection
																	</ListItem>
																	<ListItem>
																		Thermostat Replacement & Repair
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Maintenance
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Repair
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Maintenance
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Repair
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Installation
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Replacement & Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"smart-thermostat-hand.jpg"} backgroundSize="cover">
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3} h={"70%"}>
																<Text fontSize={"36px"} >Heating / Gas</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Furnance Maintenance
																	</ListItem>
																	<ListItem>
																		Geothermal Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heating Installation
																	</ListItem>
																	<ListItem>
																		Gas Applicance Installation
																	</ListItem>
																	<ListItem>
																		Gas Pipe Installation
																	</ListItem>
																	<ListItem>
																		Gas Leak Detection
																	</ListItem>
																	<ListItem>
																Gas Leak Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"wh-repair.jpg"} backgroundSize="cover" backgroundPosition={"right"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3} h={"40%"}>
																<Text fontSize={"36px"}>Water Heaters</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Water Heater Inspection
																	</ListItem>
																	<ListItem>
																		Water Heater Repair
																	</ListItem>
																	<ListItem>
																		Water Line Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
													</Grid>
												</Collapse>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Divider bg="black" />
							<Divider bg="black" />

							<Image src='/air-conditioner.jpg' position={"absolute"} className="noselect" />
							<Flex justifyContent={"center"} position={"absolute"} width={"100%"}>
								<Grid
									templateColumns={"repeat(2,1fr)"}
									templateRows={"repeat(2,1fr)"}
									width={"100%"}
								>
									<GridItem justifyContent={"center"} p={6}>
										<Flex>
											<Text bg={"white"} p={1} rounded={3} fontSize={26} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"}>Liscened & Insured</Text>
										</Flex>
									</GridItem>
									<GridItem justifyContent={"center"} p={6}>
										<Flex float={"right"}>
											<Text textAlign={"right"} bg={"white"} p={1} rounded={3} fontSize={26} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"}>Family Owned</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan={2} justifyContent={"center"} alignContent={"flex-end"} mt={"5%"}>
										<Flex justifyContent={"center"} >
											<Text textAlign={"center"} bg={"white"}><Button boxShadow={"0px 2px 4px 2px"} fontFamily={"Inter"}>Schedule Your Maitenence Below!</Button></Text>
										</Flex>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem mt={"30%"}>
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"700px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Mr. Lou prides on fast and friendly customer
									service. Schedule your maintenance below! We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem justifyContent={"center"} display={"flex"}>
							<Flex flexDir={"column"} width={"700px"}>
								<form>
									<Flex justifyContent={"center"}>
										<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}>your Contact Information &nbsp; <GrContactInfo size={30} /></Badge>
									</Flex>
									<Grid
										templateColumns={"repeat(2,1fr)"}
									>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaUser color='white' />
												</InputLeftElement>
												<Input placeholder='Full Name' bg={"#222"} color={"white"} required onChange={(event) => changeName(event.target.value)} value={custName} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaHome color='white' />
												</InputLeftElement>
												<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} required isRequired />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaPhone color='white' />
												</InputLeftElement>
												<Input placeholder='Phone Number (xxx)xxx-xxxx' bg={"#222"} color={"white"} type={"number"} required onChange={(event) => changePhoneNum(event.target.value)} value={custPhoneNum} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<GiModernCity color='white' size={26} />
												</InputLeftElement>
												<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} required isRequired />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<RiMailFill color='white' />
												</InputLeftElement>
												<Input placeholder='Email' bg={"#222"} color={"white"} onChange={(event) => changeEmail(event.target.value)} value={custEmail} required isRequired />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaSearchLocation color='white' />
												</InputLeftElement>
												<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} required isRequired />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={20}>When Are you Available?</Badge>
											</Flex>
											<Flex justifyContent={"center"} height={65}>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekdayButtonState()} id={weekDayID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekdays</Text>
													<Text textAlign={"center"} fontSize={12}>(Mon-Fri)</Text>
												</Button>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekEndButtonState()} id={weekEndID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekends</Text>
													<Text textAlign={"center"} fontSize={12}>(Sat-Sun)</Text>
												</Button>
											</Flex>
											<Flex justifyContent={"center"} pt={3}>
												<Accordion allowToggle>
													<AccordionItem>
														<AccordionButton justifyContent={"center"} bg={"#78B2E0"} rounded={6}>
															Change availability for specific days and time periods
															<AccordionIcon />
														</AccordionButton>
														<AccordionPanel>
															<Flex>
																<InputGroup>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeSundayButtonState()} id={SundayID}>
																		Sunday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeMondayButtonState()} id={MondayID}>
																		Monday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeTuesdayButtonState()} id={TuesdayID}>
																		Tuesday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeWednesdayButtonState()} id={WednesdayID}>
																		Wednesday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeThursdayButtonState()} id={ThursdayID}>
																		Thursday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeFridayButtonState()} id={FridayID}>
																		Friday
																	</Button>
																	<Button bg={"rgb(200,200,200)"} onClick={() => changeSaturdayButtonState()} id={SaturdayID}>
																		Saturday
																	</Button>
																</InputGroup>
															</Flex>
															<Flex color={"whiteAlpha.900"} justifyContent={"center"} m={3}>
																<CheckboxGroup>
																	<Flex display={"flex"} flexDir={"column"}>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeMornings()}>
																			Morning (8AM-10AM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeEvenings()}>
																			Evening (10AM-12PM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={() => changeAfternoons()}>
																			Afternoon (12PM-5PM)
																		</Checkbox>
																	</Flex>
																</CheckboxGroup>
															</Flex>
															<Divider bg={"black"} mt={1} />
															<Divider bg="black" />

														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											</Flex>
										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"} pt={2}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={24}>How Can We Help?</Badge>
											</Flex>
											<Textarea onChange={(event) => changeMessage(event.target.value)} value={custMessage} bg={"#222"} color={"white"} isRequired>

											</Textarea>
										</GridItem>
										<GridItem colSpan={2} p={3} display={"flex"} justifyContent={"end"}>
											<Button bg={backgroundColor} isLoading={buttonSubmitQM} loadingText='Submitting Request' onClick={(e) => submitForm(e)} type={"submit"}>Submit</Button>
										</GridItem>
									</Grid>
								</form>
							</Flex>
						</GridItem>
						<GridItem roundedBottomRight={6}>
							<Flex justifyContent={"center"} rounded={6}>
								<iframe title="MrLousServiceMap" src="https://www.google.com/maps/d/u/0/embed?mid=1HtJi_5obeT-Hgzgmf-KMoGks9mnLIUdE&ehbc=2E312F" width="700" height="480"></iframe>
							</Flex>
						</GridItem>


						<GridItem
							//bg={"slategray"} 
							roundedBottomLeft={6} alignSelf={"center"} >

							<Text bg={"#333"} color={"white"} rounded={3} p={2}>Where I serve in the greater Chicago land area:</Text>
							<Grid
								templateColumns={"repeat(3,1fr)"}
								templateRows={"repeat(1,1fr)"}
								border={"1px"}
								roundedBottomLeft={6}
								textAlign={"center"}>
								<GridItem borderRight={"1px"} display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"}>
										<ListItem >
											<Badge colorScheme={"black"} fontSize={18}>
												Elburn
											</Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Geneva
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Glen Ellyn
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Maple Park
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Saint Charles
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Wayne
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												West Chicago
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Wheaton
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Carol Stream
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Winfield
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Crest Hill
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Shorewood
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Channahon
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Joliet
											</ Badge>
										</ListItem>

									</UnorderedList>
								</GridItem>

								<GridItem borderRight={"1px"} display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"}>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Bolingbrook
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lockport
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Romeoville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Minooka
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Aurora
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Batavia
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Big Rock
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Bristol
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Downers Grove
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Woodridge
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Hinckley
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lisle
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Montgomery
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Mooseheart
											</ Badge>
										</ListItem>
									</UnorderedList>
								</GridItem>
								<GridItem display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"}>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Naperville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Newark
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												North Aurora
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Oswego
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Plainfield
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Plano
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Sandwich
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Somonauk
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Sugar Grove
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Warrenville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Yorkville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Darien
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Fox Valley
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lemont
											</ Badge>
										</ListItem>
									</UnorderedList>
								</GridItem>
							</Grid>

						</GridItem>
						<GridItem bg={"#222"}>
							<Flex justifyContent={"center"}>
								<Grid
									color={"white"}
									templateColumns={"repeat(2,1fr)"}
									templateRows={"repeat(2,1fr)"}
									pt={6}>
									<GridItem m={3}>
										<Text textAlign={"left"}>
											<b>Mr. Lou's HVAC & Handyman Services</b> <br />
											139 Wolf's Crossing Rd <br />
											Oswego, IL 60543<br />
											(331) 588-7681<br />
											Monday-Friday:<br />
											Saturday-Sunday: <br />
										</Text>
									</GridItem>
									<GridItem m={3}>
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.147533850225!2d-88.26621944894055!3d41.69575068468268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef13d00fbfc1b%3A0x1351be14f52adba!2s139%20Wolf%E2%80%99s%20Crossing%20Rd%2C%20Oswego%2C%20IL%2060543!5e0!3m2!1sen!2sus!4v1651770438895!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
									</GridItem>
									<GridItem m={3}>
										<Flex justifyContent={"center"}>
											<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
												<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
													<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
														<FaFacebook />
													</IconContext.Provider>
												</a>
											</Button>
											<Button variant={"ghost"} rounded={"full"} _hover={{ bg: "whitesmoke" }}>
												<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
													<Image src='/Google_Maps_icon.png' boxSize={9} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3} />
												</a>
											</Button>
										</Flex>
									</GridItem>
									<GridItem m={3}>
										<UnorderedList>
											<ListItem>
												<Button variant={"link"}><u><Link to={"/"}>Home</Link></u></Button>
											</ListItem>
										</UnorderedList>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem bg={"#111"}
							color={"white"}>
							<Flex justifyContent={"center"} fontFamily={"Inter"} padding={2}>
								<Flex paddingTop={2}>
									<AiOutlineCopyrightCircle size={20} />
								</Flex>
								<Text paddingTop={3} fontSize={12}>
									&nbsp; COPYRIGHT MR. LOU's HVAC | 331-588-7681 | SITE CREATED BY &nbsp;
								</Text>
								<Button border={"1px"} borderColor={"green.500"} bg={"#222"}>
									<a target={"_blank"} href={"https://theepicpebbles.github.io"} >
										🪨 Pebble Labs 🧪
									</a>
								</Button>
							</Flex>
						</GridItem>
					</Grid>
			</>
			: <></>}
			{showMobile ? 
			<>
					<Grid
						height={"100%"}
						width={"100%"}
						bg={"white"}
						justifyContent={"center"}
						color={"black"}
						display={"block"}>
						<GridItem display={"flex"} flexDir={"row"} justifyContent={"center"} p={1} bg={backgroundColor} width={"100%"}>
							<Flex width={"100%"} justifyContent={"space-between"}>
								<Button variant={"ghost"} rounded={"full"}>
									<a href="mailto:mrloushvac@gmail.com" target={"_blank"}>
										<Flex>
											<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>Email Us!</Text>
										</Flex>
									</a>
								</Button>
								<Button variant={"ghost"} rounded={"full"} >
									<a href='tel:+13315887681' target={"_blank"} >
										<Flex>
											<Flex p={1} fontSize={12}><IoIosCall size={"22px"} />  <Text pt={"3px"} >(331)588-7681</Text> </Flex>
										</Flex>
									</a>
								</Button>
								<Flex>
									<Button variant={"ghost"} rounded={"full"}>
										<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
											<Image src='/Google_Maps_icon.png' boxSize={8} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3} mr={1} />
										</a>
									</Button>
									<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
										<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
											<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
												<FaFacebook />
											</IconContext.Provider>
										</a>
									</Button>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
							<Link to={"/"} width={"100%"}>
								<Flex justifyContent={"center"} bg="whitesmoke" paddingTop={1}>
									<Image src='/logo.png' boxSize={"125px"} borderRadius={"full"} border={"2px"} shadow={"0px 0px 5px 2px black"} />
									<Image src='/CompanyNameLogo1.png' width={"265px"} objectFit={"contain"} />
								</Flex>
								<Flex flexDir={"column"} bg="whitesmoke" paddingBottom={3}>
									<Flex justifyContent={"center"} paddingTop={1}>
										<Image src='/air.png' width={"100px"} objectFit={"contain"} /> &nbsp;
										<Image src='/conditioning.png' width={230} objectFit={"contain"} paddingTop={1} />
									</Flex>
								</Flex>
							</Link>

							<Flex justifyContent={"center"}>
								<Flex justifyContent={"space-between"} width={"100%"}>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Accordion color={"black"} allowToggle allowMultiple width={"100%"}>
										<AccordionItem>
											<AccordionButton mt={"-5px"} width={"100%"}>
												< Button variant='none' colorScheme={"black"} onClick={() => openServices()} width={"100%"} background={backgroundColor}>
													<Text>Quality Services</Text> <AccordionIcon float={"right"} />
												</Button>
											</AccordionButton>
											<AccordionPanel position={"absolute"} bg={"white"} width={"100%"} justifyContent={"center"} roundedBottom={3} zIndex={3} boxShadow={"0px 15px 23px 0px rgba(0,0,0,0.75)"}>
												<Collapse in={isOpen} animateOpacity>
													<Grid
														templateColumns={"repeat(1,1fr)"}
														templateRows={"repeat(4,1fr)"}
														border={"1px"} rounded={6}
													>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/ductwork.jpg"} rounded={3} color={"white"} >
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} rounded={3} p={2} h={"60%"}>
																<Text fontSize={"24px"} textAlign={"center"}>Ductwork/Ventilation</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Ventilation & Ductwork Installation
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Repair
																	</ListItem>
																	<ListItem>
																		Ventilation & Ductwork Maintenance
																	</ListItem>
																	<ListItem>
																		Crawl Space Ventilation Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"/AC_UNIT.jpg"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.8)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"24px"} textAlign={"center"}>HVAC</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		HVAC Inspection
																	</ListItem>
																	<ListItem>
																		Thermostat Replacement & Repair
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Maintenance
																	</ListItem>
																	<ListItem>
																		Heating & Cooling Repair
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Maintenance
																	</ListItem>
																	<ListItem>
																		Central Air Conditioning Repair
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Installation
																	</ListItem>
																	<ListItem>
																		Exhaust Fan Replacement & Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"smart-thermostat-hand.jpg"} backgroundSize="cover">
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3}>
																<Text fontSize={"24px"}  textAlign={"center"}>Heating / Gas</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Furnance Maintenance
																	</ListItem>
																	<ListItem>
																		Geothermal Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heat Pump Repair
																	</ListItem>
																	<ListItem>
																		Heating Installation
																	</ListItem>
																	<ListItem>
																		Gas Applicance Installation
																	</ListItem>
																	<ListItem>
																		Gas Pipe Installation
																	</ListItem>
																	<ListItem>
																		Gas Leak Detection
																	</ListItem>
																	<ListItem>
																		Gas Leak Repair
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
														<GridItem justifyContent={"center"} display={"flex"} colSpan={1} rowSpan={1} border={"1px"} p={3} backgroundImage={"wh-repair.jpg"} backgroundSize="cover" backgroundPosition={"right"}>
															<Flex flexDir={"column"} background={"rgba(38, 51, 63, 0.7)"} color={"white"} p={2} rounded={3} h={"50%"}>
																<Text fontSize={"24px"} textAlign={"center"}>Water Heaters</Text>
																<UnorderedList fontWeight={"bold"}>
																	<ListItem>
																		Water Heater Inspection
																	</ListItem>
																	<ListItem>
																		Water Heater Repair
																	</ListItem>
																	<ListItem>
																		Water Line Installation
																	</ListItem>
																</UnorderedList>
															</Flex>
														</GridItem>
													</Grid>
												</Collapse>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Divider bg="black" />
							<Divider bg="black" />

							<Image src='/air-conditioner.jpg' position={"absolute"} className="noselect" height={200} width={"100%"} objectFit={"fill"} />
							<Flex justifyContent={"center"} position={"absolute"} width={"100%"}>
								<Grid
									templateColumns={"repeat(2,1fr)"}
									templateRows={"repeat(2,1fr)"}
									width={"100%"}
								>
									<GridItem justifyContent={"center"} p={6}>
										<Flex>
											<Text bg={"white"} p={1} rounded={3} fontSize={20} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"} textAlign={"center"}>Liscened & Insured</Text>
										</Flex>
									</GridItem>
									<GridItem justifyContent={"center"} p={6}>
										<Flex float={"right"}>
											<Text textAlign={"center"} bg={"white"} p={1} rounded={3} fontSize={20} boxShadow={"0px 2px 4px 2px"} className="noselect" fontFamily={"Inter"}>Family Owned</Text>
										</Flex>
									</GridItem>
									<GridItem colSpan={2} justifyContent={"center"} alignContent={"flex-end"} mt={"5%"}>
										<Flex justifyContent={"center"} > 
											<Text textAlign={"center"} bg={"white"}><Button boxShadow={"0px 2px 4px 2px"} fontFamily={"Inter"}>Schedule Your Maitenence Below!</Button></Text>
										</Flex>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem mt={"200px"}>
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"100%"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}><b>Mr. Lou's HVAC & Handyman Services</b> prides on <i>fast</i>  and <i>friendly</i> customer
									service. <br /> <b> <u> Schedule your maintenance below!</u></b> <br/> We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems!</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem justifyContent={"center"} display={"flex"}>
							<Flex flexDir={"column"} width={"100%"}>
								<form>
									<Flex justifyContent={"center"}>
										<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}> your Contact Information &nbsp; <GrContactInfo size={30} /></Badge>
									</Flex>
									<Grid
										templateColumns={"repeat(2,1fr)"}
									>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaUser color='white' />
												</InputLeftElement>
												<Input placeholder='Full Name' bg={"#222"} color={"white"} required onChange={(event) => changeName(event.target.value)} value={custName} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaPhone color='white' />
												</InputLeftElement>
												<Input placeholder='Phone Number (xxx)xxx-xxxx' bg={"#222"} color={"white"} type={"number"} required onChange={(event) => changePhoneNum(event.target.value)} value={custPhoneNum} />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<RiMailFill color='white' />
												</InputLeftElement>
												<Input placeholder='Email' bg={"#222"} color={"white"} onChange={(event) => changeEmail(event.target.value)} value={custEmail} required />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaHome color='white' />
												</InputLeftElement>
												<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} required />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<GiModernCity color='white' size={26} />
												</InputLeftElement>
												<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} required />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaSearchLocation color='white' />
												</InputLeftElement>
												<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} required />
											</InputGroup>
										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={20}>When Are you Available?</Badge>
											</Flex>
											<Flex justifyContent={"center"} height={65}>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekdayButtonState()} id={weekDayID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekdays</Text>
													<Text textAlign={"center"} fontSize={12}>(Mon-Fri)</Text>
												</Button>
												<Button display={"flex"} flexDir={"column"} onClick={() => changeWeekEndButtonState()} id={weekEndID} m={1} width={"100%"} height={"100%"}>
													<Text>Any Time Weekends</Text>
													<Text textAlign={"center"} fontSize={12}>(Sat-Sun)</Text>
												</Button>
											</Flex>
											<Flex justifyContent={"center"} pt={3}>
												<Accordion allowToggle>
													<AccordionItem>
														<AccordionButton justifyContent={"center"} bg={"#78B2E0"} rounded={6}>
															Change availability for specific days and time periods
															<AccordionIcon />
														</AccordionButton>
														<AccordionPanel >
															<Flex justifyContent={"center"}>
																<Flex width={350} overflowX={"scroll"} justifyContent={"center"}>
																	<InputGroup width={812} border={"1px"} paddingLeft={"232px"}>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeSundayButtonState()} id={SundayID} width={116}>
																			Sunday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeMondayButtonState()} id={MondayID} width={116}>
																			Monday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeTuesdayButtonState()} id={TuesdayID} width={116}>
																			Tuesday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeWednesdayButtonState()} id={WednesdayID} width={116}>
																			Wednesday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeThursdayButtonState()} id={ThursdayID} width={116}>
																			Thursday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeFridayButtonState()} id={FridayID} width={116}>
																			Friday
																		</Button>
																		<Button bg={"rgb(200,200,200)"} onClick={() => changeSaturdayButtonState()} id={SaturdayID} width={116}>
																			Saturday
																		</Button>
																	</InputGroup>
																</Flex>
															</Flex>

															<Flex color={"whiteAlpha.900"} justifyContent={"center"} m={3}>
																<CheckboxGroup>
																	<Flex display={"flex"} flexDir={"column"}>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeMornings()}>
																			Morning (8AM-10AM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={()=> changeEvenings()}>
																			Evening (10AM-12PM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6} onClick={() => changeAfternoons()}>
																			Afternoon (12PM-5PM)
																		</Checkbox>
																	</Flex>
																</CheckboxGroup>
															</Flex>
															<Divider bg={"black"} mt={1} />
															<Divider bg="black" />

														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											</Flex>
										</GridItem>
										<GridItem colSpan={2}>
											<Flex justifyContent={"center"} pt={2}>
												<Badge colorScheme={"black"} fontFamily={"Inter"} fontSize={24}>How Can We Help?</Badge>
											</Flex>
											<Textarea onChange={(event) => changeMessage(event.target.value)} value={custMessage} bg={"#222"} color={"white"} isRequired>

											</Textarea>
										</GridItem>
										<GridItem colSpan={2} p={3} display={"flex"} justifyContent={"center"}>
											<Button bg={backgroundColor} isLoading={buttonSubmitQM} loadingText='Submitting Request' onClick={(e) => submitForm(e)} type={"submit"}>Submit</Button>
										</GridItem>
									</Grid>
								</form>
							</Flex>
						</GridItem>
						<GridItem roundedBottomRight={6}>
							<Flex justifyContent={"center"} rounded={6}>
								<iframe title="MrLousServiceMap" src="https://www.google.com/maps/d/u/0/embed?mid=1HtJi_5obeT-Hgzgmf-KMoGks9mnLIUdE&ehbc=2E312F" width="100%" height="700"></iframe>
							</Flex>
						</GridItem>


						<GridItem
							//bg={"slategray"} 
							roundedBottomLeft={6} alignSelf={"center"}>

							<Text bg={"#333"} color={"white"} rounded={3} p={2} width={"100%"}>Where I serve in the greater Chicago land area:</Text>
							<Grid
								templateColumns={"repeat(1,1fr)"}
								templateRows={"repeat(3,1fr)"}
								border={"1px"}
								roundedBottomLeft={6}
								width={"100%"}
								textAlign="center">
								<GridItem borderRight={"1px"} display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"} >
										<ListItem >
											<Badge colorScheme={"black"} fontSize={18}>
												Elburn
											</Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Geneva
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Glen Ellyn
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Maple Park
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Saint Charles
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Wayne
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												West Chicago
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Wheaton
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Carol Stream
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Winfield
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Crest Hill
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Shorewood
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Channahon
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Joliet
											</ Badge>
										</ListItem>

									</UnorderedList>
								</GridItem>

								<GridItem borderRight={"1px"} display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"}>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Bolingbrook
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lockport
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Romeoville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Minooka
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Aurora
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Batavia
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Big Rock
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Bristol
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Downers Grove
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Woodridge
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Hinckley
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lisle
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Montgomery
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Mooseheart
											</ Badge>
										</ListItem>
									</UnorderedList>
								</GridItem>
								<GridItem display={"flex"} justifyContent={"center"}>
									<UnorderedList listStyleType={"none"}>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Naperville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Newark
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												North Aurora
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Oswego
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Plainfield
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Plano
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Sandwich
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Somonauk
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Sugar Grove
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Warrenville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Yorkville
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Darien
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Fox Valley
											</ Badge>
										</ListItem>
										<ListItem>
											<Badge colorScheme={"black"} fontSize={18}>
												Lemont
											</ Badge>
										</ListItem>
									</UnorderedList>
								</GridItem>
							</Grid>

						</GridItem>
						<GridItem bg={"#222"}>
							<Flex justifyContent={"center"}>
								<Grid
									color={"white"}
									templateColumns={"repeat(2,1fr)"}
									templateRows={"repeat(2,1fr)"}
									pt={6}>
									<GridItem m={3}>
										<Text textAlign={"left"}>
											<b>Mr. Lou's HVAC & Handyman Services</b> <br />
											139 Wolf's Crossing Rd <br />
											Oswego, IL 60543<br />
											(331) 588-7681<br />
											Monday-Friday:<br />
											Saturday-Sunday: <br />
										</Text>
									</GridItem>
									<GridItem m={3}>
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.147533850225!2d-88.26621944894055!3d41.69575068468268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef13d00fbfc1b%3A0x1351be14f52adba!2s139%20Wolf%E2%80%99s%20Crossing%20Rd%2C%20Oswego%2C%20IL%2060543!5e0!3m2!1sen!2sus!4v1651770438895!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
									</GridItem>
									<GridItem m={3}>
										<Flex justifyContent={"center"}>
											<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
												<a href='https://www.facebook.com/mrlous/' target={"_blank"}>
													<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
														<FaFacebook />
													</IconContext.Provider>
												</a>
											</Button>
											<Button variant={"ghost"} rounded={"full"} _hover={{ bg: "whitesmoke" }}>
												<a target="_blank" href="https://www.google.com/maps/place/139+Wolf%E2%80%99s+Crossing+Rd,+Oswego,+IL+60543/@41.6957507,-88.2662194,17z/data=!3m1!4b1!4m5!3m4!1s0x880ef13d00fbfc1b:0x1351be14f52adba!8m2!3d41.695746!4d-88.264025">
													<Image src='/Google_Maps_icon.png' boxSize={9} objectFit={"contain"} bg="#e0eeff" p={1} rounded={3} />
												</a>
											</Button>
										</Flex>
									</GridItem>
									<GridItem m={3}>
										<UnorderedList>
											<ListItem>
												<Button variant={"link"}><u><Link to={"/"}>Home</Link></u></Button>
											</ListItem>
										</UnorderedList>
									</GridItem>
								</Grid>
							</Flex>
						</GridItem>
						<GridItem bg={"#111"}
							color={"white"}>
							<Flex justifyContent={"center"} fontFamily={"Inter"} padding={2}>
								<Flex paddingTop={2}>
									<AiOutlineCopyrightCircle size={18} />
								</Flex>
								<Text paddingTop={3} fontSize={10}>
									&nbsp; COPYRIGHT MR. LOU'S HVAC | 331-588-7681 | <br /> SITE CREATED BY &nbsp; 
									<Button border={"1px"} borderColor={"green.500"} p={1} bg={"#222"}>
										<a target={"_blank"} href={"https://theepicpebbles.github.io"}>
											🪨 Pebble Labs 🧪
										</a>
									</Button>
								</Text>
							</Flex>
						</GridItem>
					</Grid>
			</>
			: <></>}
		</>
	);
}