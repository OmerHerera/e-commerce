
import CryptoJS from 'crypto-js';

export const standardEvents = {
  addToCart: 'add-to-cart-v1',
  syncCart: 'sync-cart-v1'
}
function sha256(str) {
  let wordArray = CryptoJS.SHA256(str);
  let hashedStr = wordArray.toString(CryptoJS.enc.Hex);
  return hashedStr;
}

export function login(user, type) {
  // eslint-disable-next-line no-undef
  if (window.DY && user && type) {
    let userCuid = user?.trim();
    let userType = type?.trim();
    // HASH EMAIL
    userCuid = userType === 'he' ? sha256(userCuid) : userCuid;
    // eslint-disable-next-line
    DY.API('event', {
      name: 'Login',
      properties: {
        dyType: 'login-v1',
        cuid: userCuid,
        cuidType: userType,
      },
    });
    return true;
  } else {
    console.error(`🔴 Missing one of the following: user,type or DY`);
    return false;
  }
}

export function optIn(user) {
  // eslint-disable-next-line
  if (user && window.DY && window.DY.API) {
    let email = user?.trim();
    // eslint-disable-next-line
    DY.API('event', {
      'name': 'message opt in',
      'properties': {
        'dyType': 'message-optin-v1',
        'cuidType': 'email',
        'plainTextEmail': email
      }
    });
    return true;
  } else {
    console.log(`🔴 Missing one of the following: user or DY`);
  }
}

export function optOut(user) {
  // eslint-disable-next-line
  if (user && window.DY && window.DY.API) {
    let email = user?.trim();
    // eslint-disable-next-line
    DY.API('event', {
      'name': 'message opt out',
      'properties': {
        'dyType': 'message-optout-v1',
        'cuidType': 'he',
        'hashedEmail': sha256(email)
      }
    });
    return true;
  } else {
    console.log(`🔴 Missing one of the following: user or DY`);
  }
}
export function triggerDYEvent(dyType, { price, productId }, cart = null) {
  console.log('triggerDYEvent')
  const updatedCart = buildUpdatedCart(cart);
  return triggerEvent(standardEvents[dyType], price, productId, updatedCart);
}


async function triggerEvent(dyType, priceLastItem, productIdLastItem, updatedCart) {
  try {
    window.DY.API('event', {
      dyType: dyType,
      value: priceLastItem,
      currency: 'USD',
      productId: productIdLastItem,
      quantity: 1,
      size: 'XL',
      cart: updatedCart
    });
    return true;
  } catch (e) {
    return false
  }
}

function buildUpdatedCart(cart) {
  let cartObj = [];
  let cartList = cart || JSON.parse(localStorage.getItem("cartList"));
  cartList.forEach(product => {
    cartObj.push({
      productId: product.productId,
      quantity: product.qty,
      itemPrice: product.price,
    });
  });
  return [...cartObj]
}

export async function setRecommendationContext({ type, data, lang, branchId }) {

  const contextObj = {
    ...(type && {
      type: type,
    }),
    ...(data && {
      data: data.split(','),
    }),
    ...(lang && {
      lng: lang,
    }),
    ...(branchId && {
      branchId: branchId,
    })
  };
  
  window.DY.recommendationContext = contextObj;
  return contextObj;
}