import {Text} from "react-native";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";

export default function Tab() {

  const {checkIsLogged} = useAuth();
  useEffect(() => {
    const check = async () => {
      await checkIsLogged();
    }
    check().then(null);
  }, []);

  return (
      <Text>salut</Text>
  )
}


