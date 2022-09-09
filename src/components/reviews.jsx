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
	ListItem
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'

import "@fontsource/inter";
import "../SCSS/main.scss";

import { IconContext } from "react-icons";
import { IoIosCall } from "react-icons/io";
import { RiMailSendLine } from "react-icons/ri";
import { FaFacebook, FaYelp } from "react-icons/fa";
import { AiOutlineCopyrightCircle, AiFillStar } from "react-icons/ai";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const Reviews = () => {
	const [showDesktop, setDesktop] = useState(null)
	const [showTablet, setTablet] = useState(null)
	const [showMobile, setMobile] = useState(null)
	const [backgroundColor, setBackgroundColor] = useState("#78B2E0");
	const [logo, setLogo] = useState("");
	const { isOpen, onToggle } = useDisclosure()


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
			console.log(result)
		}
	});
	return (
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
									<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/"}>Home</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/Estimates"}>Estimates</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/About"}>About</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"1000px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Louie's Air Conditioning prides itself on our fast and friendly customer
									service. Schedule your maintenance with the <Button bg={backgroundColor}><Link to={"/Estimates"}>Estimates Page</Link></Button>! We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
							<Text textAlign={"center"} fontSize={64}><i>Reviews Section</i></Text>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
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
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61849.29497655521!2d-80.25624919242829!3d27.32090691844089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88deeee467bd4d67%3A0x510173499238ac7c!2sLouie&#39;s%20Air%20Conditioning!5e0!3m2!1sen!2sus!4v1650510959415!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
												<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
										<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/"}>Home</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/Estimates"}>Estimates</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"}><Link to={"/About"}>About</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem >
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"700px"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}>Louie's Air Conditioning prides itself on our fast and friendly customer
									service. Schedule your maintenance with the <Button bg={backgroundColor}><Link to={"/Estimates"}>Estimates Page</Link></Button>! We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems.</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
							<Text textAlign={"center"} fontSize={64}><i>Reviews Section</i></Text>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
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
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61849.29497655521!2d-80.25624919242829!3d27.32090691844089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88deeee467bd4d67%3A0x510173499238ac7c!2sLouie&#39;s%20Air%20Conditioning!5e0!3m2!1sen!2sus!4v1650510959415!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
												<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
										<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
											<AccordionPanel position={"absolute"} bg={"white"} width={"100%"} roundedBottom={3} zIndex={3} ml={"-2.5%"}>
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
									<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/"}>Home</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/Estimates"}>Estimates</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
									<Button variant='link' colorScheme={"black"} bg={backgroundColor} marginTop={2} marginBottom={2} p={1}><Link to={"/About"}>About</Link></Button>
									<Text fontSize={"3xl"} className="noselect">|</Text>
								</Flex>
							</Flex>
						</GridItem>
						<GridItem>
							<Divider bg="black" />
							<Divider bg="black" />

							<Flex justifyContent={"center"}>
								<Text width={"100%"} textAlign={"center"} fontFamily={"Inter"} fontSize={20}><b>Louie's Air Conditioning</b> prides itself on our <i>fast</i>  and <i>friendly</i> customer
									service. Schedule your maintenance with the <Button bg={backgroundColor}><Link to={"/Estimates"}>Estimates Page</Link></Button> <br /> We also provide fast
									&nbsp;<u><b>emergency service</b></u> on all air conditioning systems!</Text>
							</Flex>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
							<Text textAlign={"center"} fontSize={64}><i>Reviews Section</i></Text>
							<Divider bg="black" />
							<Divider bg="black" />

						</GridItem>
						<GridItem>
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
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61849.29497655521!2d-80.25624919242829!3d27.32090691844089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88deeee467bd4d67%3A0x510173499238ac7c!2sLouie&#39;s%20Air%20Conditioning!5e0!3m2!1sen!2sus!4v1650510959415!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
												<a target="_blank" href="https://www.google.com/maps/place/Louie's+Air+Conditioning/@27.3209069,-80.2562492,12.88z/data=!4m5!3m4!1s0x88deeee467bd4d67:0x510173499238ac7c!8m2!3d27.3389655!4d-80.3280943">
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
		</>
	);
}