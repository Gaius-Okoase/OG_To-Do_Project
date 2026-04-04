Today is the 4th of April 2026.
I'm working on Refresh Token Rotation for this project and here's what I learnt from discussing with Claude AI. Here's the chat link: https://claude.ai/share/12263a34-3b05-4023-93ff-3f5105c033ba

1. Refresh Token Flow pattern: 
i) First, I learnt about *Rotation*. Which simply refers to the frequency of change of the refresh token.
ii) Without Rotation pattern: When the access token expires, the refresh token is used again and again to get a new access token until it expires. I.E. The refresh token isn't changed until it expires.  
This was what I had in mind. I believed this will prevent the user from being logged out every time the access token expires. While this isn't wrong, here's the drawback: If an attacker gets the refresh token, they have access to the account till the refresh token expires. Which is typically a minimmum 24 hours to 7d.
iii) With Rotation pattern: When the access token expires, the refresh token is used to get a new access token and a new refresh token. 
With this, anytime the user gets a refresh token, a new one is sent once the access token expires. Thereby limitng the access of the attacker by a huge margin.

2) How the Refresh Token is issued, saved and protected:  
After learning about the "With Rotation" pattern, the next thing that came up was "*What happens if the attacker gets access to a refresh token and uses it before the legitimate user?"  
Two things happens:
- The use

