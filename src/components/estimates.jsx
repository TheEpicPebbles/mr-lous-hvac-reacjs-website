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
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	CheckboxGroup,
	Checkbox,
	Textarea,
	useToast
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'

import emailjs from "emailjs-com";

import "@fontsource/inter";
import "../SCSS/main.scss";
import  "../SCSS/estimatesPage.scss";

import { IconContext } from "react-icons";
import { IoIosCall } from "react-icons/io";
import { RiMailFill, RiMailSendLine } from "react-icons/ri";
import { FaFacebook, FaHome, FaPhone, FaSearchLocation, FaUser, FaYelp } from "react-icons/fa";
import { GiModernCity } from 'react-icons/gi'
import { AiFillStar, AiOutlineCopyrightCircle } from "react-icons/ai";
import { GrContactInfo } from 'react-icons/gr'
import $ from "jquery";
import { Link } from 'react-router-dom';

export const Estimates = () => {
	
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


	const [custAvailArray, setCustAvailArray] = useState(
		{
			Sunday    : "",
			Monday    : "",
			Tuesday   : "",
			Wednesday : "",
			Thursday  : "",
			Friday    : "",
			Saturday  : ""
		})

	const [buttonSubmitQM, setButtonSubmitQM] = useState(false)
	const toast = useToast()
	let submitForm = (e) => {
		if (custName.length > 0 && custPhoneNum.length > 0 && custAddress.length > 0 && custCity.length > 0 && custZip.length > 0 && custMessage.length > 0) {
			setButtonSubmitQM(true);

			console.log(custName + "  " + custPhoneNum + "  " + custEmail + "  " + custAddress + "   " + custCity + "   " + custZip + "   "+ custMessage)
			e.preventDefault();
			var templateParams = {
				from_name: custName,
				simpmessage: custMessage,
				phone: custPhoneNum,
				zipcode: custZip,
				city: custCity,
				address: custAddress,
				reply_to: custEmail
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
	let changeName = (value) =>{
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
	let changeMessage = (value) =>{
		setCustMessage(value)
	}

	let changeWeekdayButtonState = () =>{
		setWeekDayState(!weekDayState);
		console.log(weekDayState)
		if(weekDayState){
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
	let changeWeekEndButtonState = () =>{
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
			if(SaturdayState == false){
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
			if(TuesdayState == false && WednesdayState == false && ThursdayState == false && FridayState == false){
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
			if(SundayState == false){
				setWeekEndState(false)
				setWeekEndID("weekEndButtonACTIVE")
			}
		} else {
			setSaturdayID("SaturdayButton")
			setWeekEndState(true)
			setWeekEndID("weekEndButton")
		}
	}

		let openServices = () => {
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

		var request = {
			placeId: "",
			fields: ['name', 'rating']
		}
		$.ajax({
			url: "../util/getReviews.php",
			type: "GET",
			success: function (result) {
				//console.log(result)
			}
		});
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
											6931 Heritage Dr | Port St. Lucie | FL 34952
										</a>
									</Button>
									<Button variant={"ghost"} rounded={"full"}>
										<a href="mailto:louiesac@yahoo.com" target={"_blank"}>
											<Flex>
												<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>louiesac@yahoo.com</Text>
											</Flex>
										</a>
									</Button>
									<Button variant={"ghost"} rounded={"full"} >
										<a href='tel:+17723357071' target={"_blank"} >
											<Flex>
												<Flex p={1}><IoIosCall size={"22px"} /></Flex> <Text p={1}>(772)335-7071</Text>
											</Flex>
										</a>
									</Button>
									<Flex>
										<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
											<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
												<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
													<FaFacebook />
												</IconContext.Provider>
											</a>
										</Button>
										<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
											<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
												<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
													<FaYelp />
												</IconContext.Provider>
											</a>
										</Button>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
								<Link to={"/"} width={"800px"}>
									<Flex justifyContent={"center"} bg="whitesmoke">
										<Image src='/logo.png' boxSize={"160px"} objectFit={"contain"} />
										<Image src='/CompanyNameLogo1.png' width={"320px"} objectFit={"contain"} />
										<Flex flexDir={"column"}>
											<Flex justifyContent={"center"}>
												<Image src='/air.png' boxSize={"75px"} objectFit={"contain"} />
											</Flex>
											<Image src='/conditioning.png' width={200} objectFit={"contain"} />
										</Flex>
									</Flex>
								</Link>

								<Flex justifyContent={"center"}>
									<Flex justifyContent={"space-between"} width={"1100px"}>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Accordion color={"black"} allowToggle allowMultiple>
											<AccordionItem>
												<AccordionButton mt={"-5px"}>
													< Button variant='none' colorScheme={"black"} onClick={() => openServices()}>
														<Text>Quality Services</Text> <AccordionIcon float={"right"} />
													</Button>
												</AccordionButton>
												<AccordionPanel position={"absolute"} bg={"white"} width={"1100px"} ml={"-101px"} roundedBottom={3} zIndex={3}>
													<Collapse in={isOpen} animateOpacity >
														<Grid
															templateColumns={"repeat(2,1fr)"}
															border={"1px"} rounded={6}>
															<GridItem justifyContent={"center"} display={"flex"}>
																<Flex flexDir={"column"}>
																	<Text>Residential</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
																		</ListItem>
																	</UnorderedList>
																</Flex>
															</GridItem>
															<GridItem justifyContent={"center"} display={"flex"} >
																<Flex flexDir={"column"}>
																	<Text>Commercial</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
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
										<Button variant='link' colorScheme={"black"}><Link to={"/About"}>About</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"}><Link to={"/"}>Home</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"}><Link to={"/Reviews"}>Reviews</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text width={"1000px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Louie's Air Conditioning prides itself on our fast and friendly customer
										service. Schedule your maintenance today! We also provide fast
										&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

							</GridItem>
							<GridItem justifyContent={"center"} display={"flex"}>
								<Flex flexDir={"column"} width={"1100px"}>
									<form>
									<Flex justifyContent={"center"}>
										<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}>Contact Information &nbsp; <GrContactInfo size={30}/></Badge>
									</Flex>
									<Grid 
										templateColumns={"repeat(2,1fr)"}
										>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaUser color='white' />
												</InputLeftElement>
												<Input placeholder='Full Name' bg={"#222"} color={"white"} isRequired required onChange={(event) => changeName(event.target.value)} value={custName}/>
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<FaPhone color='white'/>
												</InputLeftElement>
												<Input placeholder='Phone Number (xxx)xxx-xxxx' bg={"#222"} color={"white"} type={"number"} required onChange={(event) => changePhoneNum(event.target.value)} value={custPhoneNum}/>
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<InputGroup>
												<InputLeftElement>
													<RiMailFill color='white'/>
												</InputLeftElement>
												<Input placeholder='Email' bg={"#222"} color={"white"}  onChange={(event) => changeEmail(event.target.value)} value={custEmail} required isRequired/>
											</InputGroup>
										</GridItem>
										<GridItem colSpan={1} m={1}>
											<Grid templateColumns={"repeat(3,1fr)"}>
												<GridItem width={250}>
													<InputGroup>
														<InputLeftElement>
															<FaHome color='white' />
														</InputLeftElement>
														<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} isRequired required/>
													</InputGroup>
												</GridItem>
												<GridItem>
													<InputGroup>
														<InputLeftElement>
															<GiModernCity color='white' size={26}/>
														</InputLeftElement>
														<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} isRequired required/>
													</InputGroup>
												</GridItem>
												<GridItem>
													<InputGroup>
														<InputLeftElement>
															<FaSearchLocation color='white' />
														</InputLeftElement>
														<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} isRequired required/>
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
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																			Morning (8AM-10AM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																			Evening (10AM-12PM)
																		</Checkbox>
																		<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																			Afternoon (12PM-5PM)
																		</Checkbox>
																	</Flex>
																</CheckboxGroup>
															</Flex>
																<Divider bg={"black"} mt={1}/>
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
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text fontSize={32}>People Love Us! Check out the Reviews Below!</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Flex width={1100}>
										<Grid p={1}>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/Gu9cpYu2zbb9eqFe8' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>April 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b> Joe & his crew are Amazing, Professional, Fair , &  Knowledgeable.
															I have used them for not only for our warehouse, but also for my personal needs as well. Never had an issue or complaint. They go above & Beyond for Customer Satisfaction.<b>&rdquo;</b>
															&nbsp;- <b>Bryan Beyer</b>
														</i>
													</Text>
												</a>
											</GridItem>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/AxSG4Xh1h7GDmTb8A' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>February 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b>
															&nbsp;I was clear across the country when we were advised our A/C was not working in very humid weather by the ocean in Florida. I called Louie's. They checked in same day and after contacting me ordered a part and fixed the problem the next day. Emailed me a very reasonable bill which I happily paid!
															<b>&rdquo;</b>
															&nbsp;- <b>Carol Weatherman</b>
														</i>
													</Text>
												</a>
											</GridItem>

											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/YzBb8yL3HNBhY1ed6' target="_blank">
												<Flex bg={"rgb(200,200,200)"}>
													<AiFillStar size={32} color={"gold"}/>
													<AiFillStar size={32} color={"gold"} />
													<AiFillStar size={32} color={"gold"}/>
													<AiFillStar size={32} color={"gold"}/>
													<AiFillStar size={32} color={"gold"}/>
												</Flex>
												<Text fontSize={18}>
														<b>January 2022</b>
												</Text>
												<Text fontSize={20} fontFamily={"Inter"} p={1}> 
												<i>
													<b>&ldquo;</b> I wish there was a 10 star rating! Incredible service and professionalism. Joe was just awesome to work with and helped our family get things working properly. Joe and staff members with this company are friendly, understanding, and professional. Our experience felt like we were working with a long time family friend who talked us through the issues at hand and different options to navigate what needed to be done. This was our first experience with needing  service on our AC and there will not be a need to “shop” for a company for our next need! <b>&rdquo;</b> 
															&nbsp;- <b>Ginny Theresa</b>
												</i>
												</Text>
												</a>
											</GridItem>
											<GridItem justifyContent={"center"} display={"flex"}>
												<Button bg={"#78B2E0"}>
													<a href={'https://www.google.com/maps/place/Louie\'s+Air+Conditioning/@27.3209069,-80.2562492,12z/data=!4m7!3m6!1s0x88deeee467bd4d67: 0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943!9m1!1b1'} target="_blank">
														Click to View More!
													</a>
												</Button>
											</GridItem>
										</Grid>
									</Flex>
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
												<b>Louie's Air Conditioning</b> <br />
												6931 Heritage Dr <br />
												Port St. Lucie, FL 34952<br />
												(772) 335-7071<br />
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
													<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
														<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
															<FaFacebook />
														</IconContext.Provider>
													</a>
												</Button>
												<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
													<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
														<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
															<FaYelp />
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
										<GridItem p={"50px"}>
											<UnorderedList>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/"}>Home</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/About"}>About</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Estimates"}>Estimates</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Reviews"}>Reviews</Link></u></Button>
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
										<AiOutlineCopyrightCircle size={24} />
									</Flex>
									<Text paddingTop={2}>
										&nbsp; COPYRIGHT LOUIE'S AIR CONDITIONING | 772-335-7071 | SITE CREATED BY &nbsp;
									</Text>
									<Button border={"1px"} borderColor={"green.500"}>
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
										<a href="mailto:louiesac@yahoo.com" target={"_blank"}>
											<Flex>
												<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>louiesac@yahoo.com</Text>
											</Flex>
										</a>
									</Button>
									<Button variant={"ghost"} rounded={"full"} >
										<a href='tel:+17723357071' target={"_blank"} >
											<Flex>
												<Flex p={1}><IoIosCall size={"22px"} /></Flex> <Text p={1}>(772)335-7071</Text>
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
											<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
												<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
													<FaFacebook />
												</IconContext.Provider>
											</a>
										</Button>
										<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
											<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
												<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
													<FaYelp />
												</IconContext.Provider>
											</a>
										</Button>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
								<Link to={"/"} width={"700px"}>
									<Flex justifyContent={"center"} bg="whitesmoke">
										<Image src='/logo.png' boxSize={"160px"} objectFit={"contain"} />
										<Image src='/CompanyNameLogo1.png' width={"320px"} objectFit={"contain"} />
										<Flex flexDir={"column"}>
											<Flex justifyContent={"center"}>
												<Image src='/air.png' boxSize={"75px"} objectFit={"contain"} />
											</Flex>
											<Image src='/conditioning.png' width={200} objectFit={"contain"} />
										</Flex>
									</Flex>
								</Link>

								<Flex justifyContent={"center"}>
									<Flex justifyContent={"space-between"} width={"700px"}>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Accordion color={"black"} allowToggle allowMultiple>
											<AccordionItem>
												<AccordionButton mt={"-5px"}>
													< Button variant='none' colorScheme={"black"} onClick={() => openServices()}>
														<Text>Quality Services</Text> <AccordionIcon float={"right"} />
													</Button>
												</AccordionButton>
												<AccordionPanel position={"absolute"} bg={"white"} width={"100%"} ml={"-11.5%"} roundedBottom={3} zIndex={3}>
													<Collapse in={isOpen} animateOpacity >
														<Grid
															templateColumns={"repeat(2,1fr)"}
															border={"1px"} rounded={6}>
															<GridItem justifyContent={"center"} display={"flex"}>
																<Flex flexDir={"column"}>
																	<Text>Residential</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
																		</ListItem>
																	</UnorderedList>
																</Flex>
															</GridItem>
															<GridItem justifyContent={"center"} display={"flex"} >
																<Flex flexDir={"column"}>
																	<Text>Commercial</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
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
										<Button variant='link' colorScheme={"black"}><Link to={"/About"}>About</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"}><Link to={"/"}>Home</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"}><Link to={"/Reviews"}>Reviews</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text width={"700px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Louie's Air Conditioning prides itself on our fast and friendly customer
										service. Schedule your maintenance today! We also provide fast
										&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

							</GridItem>
							<GridItem justifyContent={"center"} display={"flex"}>
								<Flex flexDir={"column"} width={"700px"}>
									<form>
										<Flex justifyContent={"center"}>
											<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}>Contact Information &nbsp; <GrContactInfo size={30} /></Badge>
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
													<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} required isRequired/>
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
													<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} required isRequired/>
												</InputGroup>
											</GridItem>
											<GridItem colSpan={1} m={1}>
												<InputGroup>
													<InputLeftElement>
														<RiMailFill color='white' />
													</InputLeftElement>
													<Input placeholder='Email' bg={"#222"} color={"white"} onChange={(event) => changeEmail(event.target.value)} value={custEmail} required isRequired/>
												</InputGroup>
											</GridItem>
											<GridItem colSpan={1} m={1}>
												<InputGroup>
													<InputLeftElement>
														<FaSearchLocation color='white' />
													</InputLeftElement>
													<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} required isRequired/>
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
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																				Morning (8AM-10AM)
																			</Checkbox>
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																				Evening (10AM-12PM)
																			</Checkbox>
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
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
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text fontSize={32}>People Love Us! Check out the Reviews Below!</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Flex width={700}>
										<Grid p={1}>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/Gu9cpYu2zbb9eqFe8' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>April 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b> Joe & his crew are Amazing, Professional, Fair , &  Knowledgeable.
															I have used them for not only for our warehouse, but also for my personal needs as well. Never had an issue or complaint. They go above & Beyond for Customer Satisfaction.<b>&rdquo;</b>
															&nbsp;- <b>Bryan Beyer</b>
														</i>
													</Text>
												</a>
											</GridItem>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/AxSG4Xh1h7GDmTb8A' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>February 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b>
															&nbsp;I was clear across the country when we were advised our A/C was not working in very humid weather by the ocean in Florida. I called Louie's. They checked in same day and after contacting me ordered a part and fixed the problem the next day. Emailed me a very reasonable bill which I happily paid!
															<b>&rdquo;</b>
															&nbsp;- <b>Carol Weatherman</b>
														</i>
													</Text>
												</a>
											</GridItem>

											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/YzBb8yL3HNBhY1ed6' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>January 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b> I wish there was a 10 star rating! Incredible service and professionalism. Joe was just awesome to work with and helped our family get things working properly. Joe and staff members with this company are friendly, understanding, and professional. Our experience felt like we were working with a long time family friend who talked us through the issues at hand and different options to navigate what needed to be done. This was our first experience with needing  service on our AC and there will not be a need to “shop” for a company for our next need! <b>&rdquo;</b>
															&nbsp;- <b>Ginny Theresa</b>
														</i>
													</Text>
												</a>
											</GridItem>
											<GridItem justifyContent={"center"} display={"flex"}>
												<Button bg={"#78B2E0"}>
													<a href={'https://www.google.com/maps/place/Louie\'s+Air+Conditioning/@27.3209069,-80.2562492,12z/data=!4m7!3m6!1s0x88deeee467bd4d67: 0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943!9m1!1b1'} target="_blank">
														Click to View More!
													</a>
												</Button>
											</GridItem>
										</Grid>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem bg={"#222"}>
								<Flex justifyContent={"center"}>
									<Grid
										color={"white"}
										pt={6}
										templateColumns={"repeat(2,1fr)"}
										templateRows={"repeat(2,1fr)"}>
										<GridItem p={1}>
											<Text textAlign={"left"}>
												<b>Louie's Air Conditioning</b> <br />
												6931 Heritage Dr <br />
												Port St. Lucie, FL 34952<br />
												(772) 335-7071<br />
												Monday-Friday:<br />
												Saturday-Sunday: <br />
											</Text>
										</GridItem>
										<GridItem p={1}>
											<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.147533850225!2d-88.26621944894055!3d41.69575068468268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880ef13d00fbfc1b%3A0x1351be14f52adba!2s139%20Wolf%E2%80%99s%20Crossing%20Rd%2C%20Oswego%2C%20IL%2060543!5e0!3m2!1sen!2sus!4v1651770438895!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
										</GridItem>
										<GridItem p={1}>
											<Flex justifyContent={"center"}>
												<Button variant={"ghost"} colorScheme={"facebook"} rounded={"full"}>
													<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
														<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
															<FaFacebook />
														</IconContext.Provider>
													</a>
												</Button>
												<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
													<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
														<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
															<FaYelp />
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
										<GridItem p={1}>
											<UnorderedList>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/"}>Home</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/About"}>About</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Estimates"}>Estimates</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Reviews"}>Reviews</Link></u></Button>
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
										&nbsp; COPYRIGHT LOUIE'S AIR CONDITIONING | 772-335-7071 | SITE CREATED BY &nbsp;
									</Text>
									<Button border={"1px"} borderColor={"green.500"}>
										<a target={"_blank"} href={"https://theepicpebbles.github.io"}>
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
										<a href="mailto:louiesac@yahoo.com" target={"_blank"}>
											<Flex>
												<Flex p={1}><RiMailSendLine /></Flex> <Text pl={1}>Email Us!</Text>
											</Flex>
										</a>
									</Button>
									<Button variant={"ghost"} rounded={"full"} >
										<a href='tel:+17723357071' target={"_blank"} >
											<Flex>
												<Flex p={1} fontSize={12}><IoIosCall size={"22px"} />  <Text pt={"3px"} >(772)335-7071</Text> </Flex>
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
											<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
												<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
													<FaFacebook />
												</IconContext.Provider>
											</a>
										</Button>
										<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
											<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
												<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
													<FaYelp />
												</IconContext.Provider>
											</a>
										</Button>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem justifyContent={"center"} display={"block"} width={"100%"}>
								<Link to={"/"} width={"100%"}>
									<Flex justifyContent={"center"} bg="whitesmoke">
										<Image src='/logo.png' boxSize={"125px"} objectFit={"contain"} />
										<Image src='/CompanyNameLogo1.png' width={"265px"} objectFit={"contain"} />
									</Flex>
									<Flex flexDir={"column"} bg="whitesmoke" paddingBottom={3}>
										<Flex justifyContent={"center"}>
											<Image src='/air.png' width={"60px"} objectFit={"contain"} />
											<Image src='/conditioning.png' width={200} objectFit={"contain"} />
										</Flex>
									</Flex>
								</Link>

								<Flex justifyContent={"center"}>
									<Flex justifyContent={"space-between"} width={"100%"}>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Accordion color={"black"} allowToggle allowMultiple>
											<AccordionItem>
												<AccordionButton mt={"-1px"} width={"125px"}>
													< Button variant='none' colorScheme={"black"} bg={backgroundColor} onClick={() => openServices()}>
														<Text>Quality <br /> Services</Text> <AccordionIcon float={"right"} />
													</Button>
												</AccordionButton>
												<AccordionPanel position={"absolute"} bg={"white"} width={"100%"} roundedBottom={3} zIndex={3} ml={"-4.5%"}>
													<Collapse in={isOpen} animateOpacity>
														<Grid
															templateColumns={"repeat(2,1fr)"}
															border={"1px"} rounded={6}>
															<GridItem justifyContent={"center"} display={"flex"}>
																<Flex flexDir={"column"}>
																	<Text>Residential</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
																		</ListItem>
																	</UnorderedList>
																</Flex>
															</GridItem>
															<GridItem justifyContent={"center"} display={"flex"} >
																<Flex flexDir={"column"}>
																	<Text>Commercial</Text>
																	<UnorderedList>
																		<ListItem>
																			Cooling
																		</ListItem>
																		<ListItem>
																			Heating
																		</ListItem>
																		<ListItem>
																			Maintenence
																		</ListItem>
																	</UnorderedList>
																</Flex>
															</GridItem>
														</Grid>
													</Collapse>
												</AccordionPanel>
											</AccordionItem>
										</Accordion>
										<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/About"}>About</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/"}>Home</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
										<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/Reviews"}>Reviews</Link></Button>
										<Text fontSize={"3xl"} className="noselect">|</Text>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text width={"100%"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Louie's Air Conditioning prides itself on our fast and friendly customer
										service. Schedule your maintenance today! We also provide fast
										&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

							</GridItem>
							<GridItem justifyContent={"center"} display={"flex"}>
								<Flex flexDir={"column"} width={"100%"}>
									<form>
										<Flex justifyContent={"center"}>
											<Badge colorScheme={"black"} fontFamily={"Inter"} p={1} fontSize={20} display={"flex"}>Contact Information &nbsp; <GrContactInfo size={30} /></Badge>
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
													<Input placeholder='Email' bg={"#222"} color={"white"} onChange={(event) => changeEmail(event.target.value)} value={custEmail} required/>
												</InputGroup>
											</GridItem>
											<GridItem colSpan={2} m={1}>
												<InputGroup>
													<InputLeftElement>
														<FaHome color='white' />
													</InputLeftElement>
													<Input placeholder='Address' bg={"#222"} color={"white"} onChange={(event) => changeAddress(event.target.value)} value={custAddress} required/>
												</InputGroup>
											</GridItem>
											<GridItem colSpan={2} m={1}>
												<InputGroup>
													<InputLeftElement>
														<GiModernCity color='white' size={26} />
													</InputLeftElement>
													<Input placeholder='City' bg={"#222"} color={"white"} onChange={(event) => changeCity(event.target.value)} value={custCity} required/>
												</InputGroup>
											</GridItem>
											<GridItem colSpan={2} m={1}>
												<InputGroup>
													<InputLeftElement>
														<FaSearchLocation color='white' />
													</InputLeftElement>
													<Input placeholder='Zip Code' bg={"#222"} color={"white"} onChange={(event) => changeZip(event.target.value)} value={custZip} required/>
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
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																				Morning (8AM-10AM)
																			</Checkbox>
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
																				Evening (10AM-12PM)
																			</Checkbox>
																			<Checkbox p={1} border={"1px"} bg={"rgb(100,100,100)"} rounded={6}>
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
							<GridItem>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Text fontSize={32} textAlign={"center"}>People Love Us! Check out the Reviews Below!</Text>
								</Flex>
								<Divider bg="black" />
								<Divider bg="black" />

								<Flex justifyContent={"center"}>
									<Flex width={"100%"}>
										<Grid p={1}>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/Gu9cpYu2zbb9eqFe8' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>April 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b> Joe & his crew are Amazing, Professional, Fair , &  Knowledgeable.
															I have used them for not only for our warehouse, but also for my personal needs as well. Never had an issue or complaint. They go above & Beyond for Customer Satisfaction.<b>&rdquo;</b>
															&nbsp;- <b>Bryan Beyer</b>
														</i>
													</Text>
												</a>
											</GridItem>
											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/AxSG4Xh1h7GDmTb8A' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>February 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b>
															&nbsp;I was clear across the country when we were advised our A/C was not working in very humid weather by the ocean in Florida. I called Louie's. They checked in same day and after contacting me ordered a part and fixed the problem the next day. Emailed me a very reasonable bill which I happily paid!
															<b>&rdquo;</b>
															&nbsp;- <b>Carol Weatherman</b>
														</i>
													</Text>
												</a>
											</GridItem>

											<GridItem background={"whitesmoke"} rounded={6} m={3}>
												<a href='https://goo.gl/maps/YzBb8yL3HNBhY1ed6' target="_blank">
													<Flex bg={"rgb(200,200,200)"}>
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
														<AiFillStar size={32} color={"gold"} />
													</Flex>
													<Text fontSize={18}>
														<b>January 2022</b>
													</Text>
													<Text fontSize={20} fontFamily={"Inter"} p={1}>
														<i>
															<b>&ldquo;</b> I wish there was a 10 star rating! Incredible service and professionalism. Joe was just awesome to work with and helped our family get things working properly. Joe and staff members with this company are friendly, understanding, and professional. Our experience felt like we were working with a long time family friend who talked us through the issues at hand and different options to navigate what needed to be done. This was our first experience with needing  service on our AC and there will not be a need to “shop” for a company for our next need! <b>&rdquo;</b>
															&nbsp;- <b>Ginny Theresa</b>
														</i>
													</Text>
												</a>
											</GridItem>
											<GridItem justifyContent={"center"} display={"flex"}>
												<Button bg={"#78B2E0"}>
													<a href={'https://www.google.com/maps/place/Louie\'s+Air+Conditioning/@27.3209069,-80.2562492,12z/data=!4m7!3m6!1s0x88deeee467bd4d67: 0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943!9m1!1b1'} target="_blank">
														Click to View More!
													</a>
												</Button>
											</GridItem>
										</Grid>
									</Flex>
								</Flex>
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
												<b>Louie's Air Conditioning</b> <br />
												6931 Heritage Dr <br />
												Port St. Lucie, FL 34952<br />
												(772) 335-7071<br />
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
													<a href='https://www.facebook.com/LouiesAirConditioning/?ref=page_internal' target={"_blank"}>
														<IconContext.Provider value={{ color: "#0165E1", className: "FaceBookIcon", size: "30px" }}>
															<FaFacebook />
														</IconContext.Provider>
													</a>
												</Button>
												<Button variant={"ghost"} _hover={{ bg: "whitesmoke" }} rounded={"full"}>
													<a href='https://www.yelp.com/biz/louies-air-conditioning-port-saint-lucie' target={"_blank"}>
														<IconContext.Provider value={{ color: "#af0606", className: "FaceBookIcon", size: "30px" }}>
															<FaYelp />
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
												<ListItem>
													<Button variant={"link"}><u><Link to={"/About"}>About</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Estimates"}>Estimates</Link></u></Button>
												</ListItem>
												<ListItem>
													<Button variant={"link"}><u><Link to={"/Reviews"}>Reviews</Link></u></Button>
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
										&nbsp; COPYRIGHT LOUIE'S AIR CONDITIONING | 772-335-7071 | <br /> SITE CREATED BY &nbsp; <Button border={"1px"} borderColor={"green.500"} p={1}>
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
			</>);
}