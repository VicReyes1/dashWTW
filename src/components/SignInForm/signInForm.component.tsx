import React from 'react';

// Importing ChakraUI Components
import {
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import Google from 'wtw-icons/_icons/Google'; // Importing wtw icons to simulate the auth-with-Google button

// Importing PropTypes
import { IPropTypes } from './signInForm.types';

// Importing react-router-dom function that allows navigation
import { useNavigate } from "react-router-dom";


// SIGN IN FORM COMPONENT----------------------------------------
function SignInForm(props: IPropTypes): JSX.Element {

	let styleLoginButton = 'login-button-clicked' // This variable is declared for testing purposes. Change prop to
                                                // 'login-button' to test the not-clicked style
	let navigate = useNavigate();

	const handleSubmit = async (event:any) => {
		event.preventDefault();
			const {email, password} = event.target.elements;
			props.setErrorMessage("");
			try {
				await props.signInWithEmail(email.value, password.value);
			} catch(err:any){
				props.setErrorMessage(err);
			}
	}

	let disabled = props.loading

	return (
		<VStack
			h="full" 
			w="full" 
			p={10}
			spacing={10}
			alignItems="flex-start"
			bg="black.main"
			borderWidth='1px'
			borderColor='transparent'
			paddingLeft='6vw'
			borderLeftColor='white'
		>
			<VStack alignItems="flex-start" 
              p={0} 
              color='white'>
				<Heading size="xl" 
						paddingBottom={5}>Welcome back!
				</Heading>
				<Button variant='with-shadow' 
                leftIcon={<Google width='1em'/>} 
                isLoading={false} 
                loadingText='CONNECTING TO GOOGLE'
				onClick={props.signInWithGoogle}>SIGN IN WITH GOOGLE
				</Button>
			</VStack>

			<Grid column={3} 
            columnGap={3} 
            rowGap={3} 
            w="full" 
            h='0.3' 
            color='white'>
				<GridItem colSpan={2} 
                  h='0.3' 
                  bg='black.main'>
					<HStack width='full' 
                  height='0.9em' 
                  borderWidth='1px' 
                  borderColor='transparent' 
                  borderBottomColor='white'>
					</HStack>
				</GridItem>
				<GridItem colSpan={1} 
                  h='0.3' 
                  textAlign='center' 
                  paddingTop={0}> or 
				</GridItem>
				<GridItem colStart={4} 
                  colEnd={6} 
                  h='0.3' 
                  bg='black.main'>
					<HStack width='full' 
                  height='0.9em' 
                  borderWidth='1px' 
                  borderColor='transparent' 
                  borderBottomColor='white'></HStack>
				</GridItem>
			</Grid>

			<form onSubmit={handleSubmit}>
				<Grid column={2} 
				columnGap={3} 
				rowGap={6} 
				w="full" 
				color='white'>
					<GridItem colSpan={2}>
						<FormControl>
							<FormLabel htmlFor='email'>Email Address</FormLabel>
							<Input placeholder="Enter your email address" 
								borderRadius="lg" 
								type='email'
								disabled={disabled}/>
						</FormControl>
					</GridItem>

					<GridItem colSpan={2}>
						<FormControl>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<Input placeholder="Enter your password" 
								borderRadius="lg" 
								type='Password' 
								disabled={disabled}/>
						</FormControl>
					</GridItem>

					<GridItem colSpan={1}/>

					<GridItem colSpan={2}/>

					<GridItem colSpan={2}>

						<Button w="full" 
							borderRadius="lg" 
							borderColor='transparent' 
							variant={styleLoginButton} 
							onClick={()=>{navigate(`/maps`)}}
							disabled={disabled}>Sign In</Button>
					</GridItem>

					<GridItem colSpan={1} 
					w='90%' 
					paddingLeft='20%'>
						<Text fontSize='xs' 
								textAlign='center'>This site is protected by the Google Privacy Policy and Terms of Service apply.
						</Text>
					</GridItem>
				</Grid>
			</form>
			{props.errorMessage ? <Text color="red.400">{props.errorMessage}</Text> :null}
			
		</VStack>
	);
}

export default SignInForm;