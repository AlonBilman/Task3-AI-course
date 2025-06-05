Alon Bilman - reflection for task 3.

---
# Tools Used

- **ChatGPT**  
  I used ChatGPT to help me write better prompts and structure my questions properly.

- **Cursor**  
  I used Cursor to work on the code, improve it, and actually code the solution.

- **GitHub Copilot**  
  I used GitHub Copilot to understand changes, follow the flow, fix things, and add comments to the code.

---

# Prompting Strategy

At first, I used **ChatGPT**.  
With its help, I wrote a long prompt that included the full assignment and all the technologies I planned to use.  
The prompt I received in return is the one I used to move forward.

I chose to use ChatGPT because it's very helpful for tasks like improving text formulations, as discussed in the guest lecture.

---

Then, I used **Cursor** and sent it the prompt I got from ChatGPT.  
I chose Cursor based on a recommendation from Gadi, our lecturer, who believes it’s one of the best tools that combine coding and AI.  
I wanted a tool that lets me actually see and work with the code, and not just receive results without understanding how they were built.  
Cursor was a good choice and gave me a first working version. However, it had several issues that I solved later on.

---

After that, I used **VSCode with Copilot**.  
I used it to:
- Add comments to the code  
- Fix small issues  
- Get explanations about the code and its flow  

I chose Copilot because it gives access to a broader range of GPTs.  
I also selected **"cloud thinking"** mode to get better explanations and clarity.  
This helped me understand and fix small issues, especially with things that didn’t work well in Cursor.

---

# Prompts That Worked for Me

### ✅ Prompt 1: Conway's Game of Life — TypeScript + React MVC

This was the first prompt that worked for me.  
I’m confident it worked because I put time into shaping it exactly how I wanted — after several iterations.  
Here’s the prompt:

> You are now a senior TypeScript + React engineer. Implement Conway's Game of Life using React (for the View) and the best possible MVC architecture.
> 
> ## Project Overview
> Build a web-based version of Conway's Game of Life using:
> - React (TypeScript) for the UI (View)  
> - A clean and modular Model-View-Controller (MVC) architecture  
> - Strict adherence to frontend best practices (hooks, reusable components, composition over inheritance, accessibility, etc.)
> 
> ## Functional Requirements
> - A 40x40 grid by default, with the ability to change grid size  
> - UI controls to:
>   - Start/Stop the simulation  
>   - Randomize the grid  
>   - Clear the grid  
>   - Toggle individual cells (only when paused)  
>   - Control simulation speed  
>   - Initialize with predefined patterns (glider, pulsar, etc.)  
> - **Saving/restoring board states:**
>   - Save current board state with a custom name  
>   - Load saved states  
>   - View, delete, and load from a list  
> 
> ## Architecture Requirements
> ### Model:
> - Holds the game logic and data  
> - Exposes clean typed interfaces  
> 
> ### View:
> - Functional components with hooks  
> - No business logic  
> 
> ### Controller:
> - Orchestrates between model and view  
> - Handles timers, interaction, and lifecycle
> 
> ## Code Quality
> - Use React + TypeScript only  
> - Hooks (`useState`, `useEffect`, `useReducer`)  
> - Avoid prop drilling  
> - Clean structure: `/model`, `/view`, `/controller`, `/components`, `/types`  
> - Responsive design and accessibility  
> - Follow SOLID principles  
> 
> ## Deliverables
> - Working application  
> - `README.md` with setup, design decisions, file breakdown  
> - Clean and well-commented code

---

### ✅ Prompt 2: Generate a Professional README

This prompt worked very well — I gave Copilot clear context using `@workspace` and asked for a complete README.  
Copilot generated a great README file, much better than I could have written myself. Everything was accurate and clear.

**Prompt:**

> @workspace  
> Go over all the files and code in the project. Read all the comments, logic, and types.  
> 
> Now, based on your full understanding of the project:
> 
> 1. Write a complete and clear `README.md` file.  
> 2. The README must explain exactly how to install, build, and run the application step-by-step.  
> 3. For every command or script you mention (e.g., `npm run dev`, `npm start`, `npm run build`), verify that it **actually exists** in `package.json` and behaves as described.  
> 4. Clarify each explanation and instruction — be specific. For example:  
>    - If the app starts on a certain port, say which.  
>    - If the build creates a certain folder, mention it.  
>    - If TypeScript or a linter is used, mention them and how to run them.  
> 
> 5. The README should also:  
>    - Briefly describe the project purpose and features  
>    - List the folder structure and explain what each main folder/file does  
>    - Mention any important dependencies or environment variables (if used)  
> 
> Everything in the README must be accurate and reflect exactly what the code does. Do not guess or hallucinate steps.

---

# Prompts That Didn’t Work

### ❌ Prompt 1: Speed Slider Issue

This is a prompt that did not work. I forgot to write `@workspace` and didn’t give Copilot enough context.  
As a result, the changes it suggested broke the entire code, and I had to manually adjust and fix everything.  
It ended up taking me a lot of time for a very simple change that I could have done on my own.

**Prompt:**

> I want the speed slider not to wipe out all the nodes. 
>
> I just want it to adjust the speed, so if I start the process and then change the speed, it won’t erase the nodes.

---

# Tool Evaluation

- **ChatGPT**:  
  Great for suggestions, design thinking, and prompt refinement.  
  Not very effective when it comes to working directly with the code or interacting with the project structure.

- **Cursor**:  
  Offers everything ChatGPT can do, but also works directly with the code.  
  It generates solid code, understands the project well, and often fixes itself when there are errors.  
  Downside : It can sometimes get stuck in an error loop or completely mess up the code if you’re not careful.

- **GitHub Copilot**:  
  Very helpful for various tasks using different GPTs.  
  I didn’t use it as much, but from what I’ve seen, it's great for comments, explanations, fixes, and overall code flow help.

---

# Project Architecture (MVC)

I followed the **MVC pattern** in my project:

- **Model**: `GameModel.ts` handles all the game logic and state (like the board and rules).

- **View**: React components like `App.tsx` and `Grid.tsx` handle the UI and user input.

- **Controller**: `GameController.ts` connects the model and view, handles user actions, and updates the game state.

I kept the code **modular**, with clear structure and naming. I used **JSDoc** for comments to make it easier to understand and maintain.

---

# Manual Fixes and Final Notes

One thing I fixed manually was the **centering of the grid** – at first, it was all over the place.  
I used ChatGPT to get layout suggestions, which helped a lot.

I tried using Cursor for this task, but it kept breaking the code no matter what prompt I gave.  
So I decided to fix it myself with help from ChatGPT instead — which worked out well.

---

