import { applyActionCode } from "firebase/auth";
import { useEffect } from "react";
import { auth, database } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const VerifyPage = () => {
  const handleVerifyEmail = (auth, actionCode) => {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    console.log(auth);
    applyActionCode(auth, actionCode)
      .then(async (resp) => {
        const userRef = doc(database, "Users", auth.currentUser.uid);

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          await updateDoc(userRef, {
            timeLastActive: Date.now(),
            lastLoginTimeStamp: Date.now(),
          });
        }
        console.log(resp);

        // Email address has been verified.
        // TODO: Display a confirmation message to the user.
        // You could also provide the user with a link back to the app.
        // TODO: If a continue URL is available, display a button which on
        // click redirects the user back to the app via continueUrl with
        // additional state determined from that URL's parameters.
      })
      .catch((error) => {
        console.log(error);
        // Code is invalid or expired. Ask the user to verify their email address
        // again.
      });
  };

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const mode = params.get("mode");
    const code = params.get("oobCode");
    switch (mode) {
      case "verifyEmail":
        // Display email verification handler and UI.
        handleVerifyEmail(auth, code);
        break;
      default:
      // Error: invalid mode.
    }

    return () => {};
  }, []);

  return <div>VerifyPage</div>;
};

export default VerifyPage;
