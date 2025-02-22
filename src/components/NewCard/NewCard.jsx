import {
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link as ReachLink } from 'react-router-dom';
import { auth } from '../../Firebase';
import { sendEmailVerification } from 'firebase/auth';

export const NewCard = ({ image, description, title, link, cta, launched, emailVerified }) => {
  const bgColor = useColorModeValue('white', 'blackAlpha.700');
  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <Link
      as={ReachLink}
      to={user && (user?.emailVerified === true) ? link : ''}
      _hover={{ textDecoration: 'none' }}
      p="1rem"
      onClick={onOpen}
    >
      <Flex alignItems="center" justifyContent="center" maxW="sm">
        <Box
          mx="auto"
          rounded="lg"
          shadow="2xl"
          _dark={{
            bg: 'gray.800',
          }}
          maxW="2xl"
        >
          <Image
            roundedTop="lg"
            w="full"
            h={64}
            fit="cover"
            src={image}
            alt="Article"
          />

          <Box p={6} bgColor={bgColor} borderBottomRadius="5px" minH="200px">
            <Box>
              <chakra.span
                fontSize="xs"
                textTransform="uppercase"
                color="brand.600"
                _dark={{
                  color: 'brand.400',
                }}
              >
                {cta}
              </chakra.span>
              {/* <Link
                as={ReachLink}
                display="block"
                color="gray.800"
                _dark={{
                  color: 'white',
                }}
                fontWeight="bold"
                fontSize="2xl"
                mt={2}
                _hover={{
                  color: 'gray.600',
                  textDecor: 'underline',
                  textDecoration: 'none',
                }}
              > */}
              <Text fontWeight="bold">{title}</Text>
              {/* </Link> */}
              <chakra.p
                mt={2}
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: 'gray.400',
                }}
              >
                {description}
              </chakra.p>
            </Box>

            <Box mt={4}>
              <Flex alignItems="center">
                <Flex alignItems="center">
                  {!launched ? (
                    <Badge colorScheme="purple">Coming Soon</Badge>
                  ) : (
                    <Badge colorScheme="green">It's Live</Badge>
                  )}
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alert 🚨</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {user?.emailVerified === false ? (
              <Text>You need to verify your email!</Text>
            ) : (
              <Text>You need to login with your account!</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {user?.emailVerified === true ? (
              <Link
                as={ReachLink}
                to="/account"
                _hover={{ textDecoration: 'none' }}
              >
                <Button>
                  <Text>Get Access</Text>
                </Button>
              </Link>
            ) : (
              <></>
            )}
            {user?.emailVerified === false && (
              <Button
                onClick={() => {
                  sendEmailVerification(auth?.currentUser).then(() => {
                    // Email verification sent!
                    console.log('Email sent');
                  });
                  toast({
                    title: `Verification E-mail Sent`,
                    position: 'top',
                    isClosable: true,
                  });
                  onClose()
                }}
              >
                Resend Verification
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Link>
  );
};
