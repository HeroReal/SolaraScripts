-- Get necessary services
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

-- Define the local player
local localPlayer = Players.LocalPlayer

-- Variables to track the states
local aimLockEnabled = false
local spinEnabled = false
local monkeyClimbEnabled = false
local systemEnabled = false
local autoAttackEnabled = false
local walkSpeedEnabled = false
local jumpBoostEnabled = false
local autoRespawnEnabled = false
local keybinds = {}
local targetPlayerName = nil
local specificTargetEnabled = false
local flingEnabled = false
local flingSpeed = 0
local defaultWalkSpeed = 16 -- Default Roblox walk speed
local defaultJumpPower = 50 -- Default Roblox jump power
local walkSpeedValue = defaultWalkSpeed
local jumpBoostValue = defaultJumpPower

-- Define the function to aim at a player's head
local function AimAtPlayer(player)
    if player.Character and player.Character:FindFirstChild("Head") then
        local targetPosition = player.Character.Head.Position
        local direction = (targetPosition - localPlayer.Character.Head.Position).unit
        localPlayer.Character:SetPrimaryPartCFrame(CFrame.new(localPlayer.Character.Head.Position, localPlayer.Character.Head.Position + direction))
    end
end

-- Function to print the name of the target player to the console
local function PrintTargetPlayer(player)
    if player then
        print("Targeting player:", player.Name)
    else
        print("No player in range.")
    end
end

-- Function to simulate blocking an attack
local function block()
    UserInputService.InputBegan:Fire({ KeyCode = Enum.KeyCode.F }, false)
    wait()
    UserInputService.InputEnded:Fire({ KeyCode = Enum.KeyCode.F }, false)
end

-- Function to toggle spinning
local function ToggleSpin()
    spinEnabled = not spinEnabled
    if spinEnabled then
        print("Spin activated")
    else
        print("Spin deactivated")
    end
end

-- Function to toggle aim lock
local function ToggleAimLock()
    aimLockEnabled = not aimLockEnabled
    if aimLockEnabled then
        print("Aim lock activated")
    else
        print("Aim lock deactivated")
    end
end

-- Function to toggle monkey climb
local function ToggleMonkeyClimb()
    monkeyClimbEnabled = not monkeyClimbEnabled
    if monkeyClimbEnabled then
        print("Monkey climb activated")
    else
        print("Monkey climb deactivated")
    end
end

-- Function to handle monkey climb
local function HandleMonkeyClimb()
    local character = localPlayer.Character
    if character and character:FindFirstChild("Humanoid") then
        character.Humanoid:SetStateEnabled(Enum.HumanoidStateType.Climbing, monkeyClimbEnabled)
    end
end

-- Function to toggle fling
local function ToggleFling(enable, speed)
    flingEnabled = enable
    flingSpeed = speed or flingSpeed
    if flingEnabled then
        print("Fling activated with speed:", flingSpeed)
    else
        print("Fling deactivated")
    end
end

-- Function to toggle auto attack
local function ToggleAutoAttack()
    autoAttackEnabled = not autoAttackEnabled
    if autoAttackEnabled then
        print("Auto attack activated")
    else
        print("Auto attack deactivated")
    end
end

-- Function to toggle walk speed
local function ToggleWalkSpeed(enable, value)
    walkSpeedEnabled = enable
    walkSpeedValue = value or walkSpeedValue
    local character = localPlayer.Character
    if character and character:FindFirstChild("Humanoid") then
        if walkSpeedEnabled then
            character.Humanoid.WalkSpeed = walkSpeedValue
            print("Walk speed changed to:", walkSpeedValue)
        else
            character.Humanoid.WalkSpeed = defaultWalkSpeed
            print("Walk speed reset to default")
        end
    end
end

-- Function to toggle jump boost
local function ToggleJumpBoost(enable, value)
    jumpBoostEnabled = enable
    jumpBoostValue = value or jumpBoostValue
    local character = localPlayer.Character
    if character and character:FindFirstChild("Humanoid") then
        if jumpBoostEnabled then
            character.Humanoid.JumpPower = jumpBoostValue
            print("Jump boost changed to:", jumpBoostValue)
        else
            character.Humanoid.JumpPower = defaultJumpPower
            print("Jump boost reset to default")
        end
    end
end

-- Function to toggle auto respawn
local function ToggleAutoRespawn()
    autoRespawnEnabled = not autoRespawnEnabled
    if autoRespawnEnabled then
        print("Auto respawn activated")
    else
        print("Auto respawn deactivated")
    end
end

-- Function to process chat commands
local function ProcessChatCommand(player, message)
    if message == "!projectharpia" then
        systemEnabled = true
        print("Project Harpia system activated")
    elseif systemEnabled then
        local args = message:split(" ")
        if args[1] == "!aimlock" and args[2] then
            if args[2] == "on" then
                aimLockEnabled = true
                print("Aim lock activated")
            elseif args[2] == "off" then
                aimLockEnabled = false
                print("Aim lock deactivated")
            end
        elseif args[1] == "!spin" and args[2] then
            if args[2] == "on" then
                spinEnabled = true
                print("Spin activated")
            elseif args[2] == "off" then
                spinEnabled = false
                print("Spin deactivated")
            end
        elseif args[1] == "!monkeyclimb" and args[2] then
            if args[2] == "on" then
                monkeyClimbEnabled = true
                ToggleMonkeyClimb()
            elseif args[2] == "off" then
                monkeyClimbEnabled = false
                ToggleMonkeyClimb()
            end
        elseif args[1] == "!aimlockplayer" and args[2] then
            targetPlayerName = args[2]
            specificTargetEnabled = true
            print("Aim lock player activated: " .. targetPlayerName)
        elseif args[1] == "!unaimlockplayer" and args[2] then
            if targetPlayerName == args[2] then
                specificTargetEnabled = false
                targetPlayerName = nil
                print("Aim lock player deactivated: " .. args[2])
            end
        elseif args[1] == "!keybind" and args[2] and args[3] then
            keybinds[args[3]] = args[2]
            print(args[2] .. " bound to " .. args[3])
        elseif args[1] == "!unkeybind" and args[2] then
            keybinds[args[2]] = nil
            print("Unbound key " .. args[2])
        elseif args[1] == "!fling" and args[2] then
            if args[2] == "on" and args[3] then
                local speed = tonumber(args[3])
                if speed then
                    ToggleFling(true, speed)
                else
                    print("Invalid speed value for fling")
                end
            elseif args[2] == "off" then
                ToggleFling(false)
            else
                print("Invalid command for fling")
            end
        elseif args[1] == "!autoattack" and args[2] then
            if args[2] == "on" then
                autoAttackEnabled = true
                print("Auto attack activated")
            elseif args[2] == "off" then
                autoAttackEnabled = false
                print("Auto attack deactivated")
            end
        elseif args[1] == "!walkspeed" and args[2] and args[3] then
            if args[2] == "on" then
                local value = tonumber(args[3])
                if value then
                    ToggleWalkSpeed(true, value)
                else
                    print("Invalid value for walk speed")
                end
            elseif args[2] == "off" then
                ToggleWalkSpeed(false)
            else
                print("Invalid command for walk speed")
            end
        elseif args[1] == "!jumpboost" and args[2] and args[3] then
            if args[2] == "on" then
                local value = tonumber(args[3])
                if value then
                    ToggleJumpBoost(true, value)
                else
                    print("Invalid value for jump boost")
                end
            elseif args[2] == "off" then
                ToggleJumpBoost(false)
            else
                print("Invalid command for jump boost")
            end
        elseif args[1] == "!autorespawn" and args[2] then
            if args[2] == "on" then
                autoRespawnEnabled = true
                print("Auto respawn activated")
            elseif args[2] == "off" then
                autoRespawnEnabled = false
                print("Auto respawn deactivated")
            end
        end
    end
end

-- Function to handle auto attack
local function HandleAutoAttack()
    if autoAttackEnabled then
        for _, player in ipairs(Players:GetPlayers()) do
            if player ~= localPlayer and player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
                local distance = (player.Character.HumanoidRootPart.Position - localPlayer.Character.HumanoidRootPart.Position).magnitude
                if distance < 15 then -- Adjust the range as needed
                    -- Simulate pressing and releasing the "F" key to attack
                    block()
                    print("Auto attacking", player.Name)
                end
            end
        end
    end
end

-- Function to handle auto respawn
local function HandleAutoRespawn()
    if autoRespawnEnabled and localPlayer.Character and not localPlayer.Character.Parent then
        local respawnBind = Enum.KeyCode.R
        UserInputService.InputBegan:Fire({ KeyCode = respawnBind }, false)
        wait(0.1)
        UserInputService.InputEnded:Fire({ KeyCode = respawnBind }, false)
        print("Auto respawning...")
    end
end

-- Connect to RunService's Heartbeat to constantly update aim, handle spinning, monkey climb, auto attack, walk speed, jump boost, and fling
RunService.Heartbeat:Connect(function()
    if aimLockEnabled then
        local targetPlayer = nil
        if specificTargetEnabled and targetPlayerName then
            for _, player in ipairs(Players:GetPlayers()) do
                if player.Name == targetPlayerName and player.Character and player.Character:FindFirstChild("Head") then
                    targetPlayer = player
                    break
                end
            end
        else
            local minDistance = math.huge
            -- Find the nearest player
            for _, player in ipairs(Players:GetPlayers()) do
                if player ~= localPlayer and player.Character and player.Character:FindFirstChild("Head") then
                    local distance = (player.Character.Head.Position - localPlayer.Character.Head.Position).magnitude
                    if distance < minDistance then
                        minDistance = distance
                        targetPlayer = player
                    end
                end
            end
        end
        -- If a target player is found, aim at their head and print their name
        if targetPlayer then
            AimAtPlayer(targetPlayer)
            PrintTargetPlayer(targetPlayer)
            -- Handle spinning
            if spinEnabled then
                local character = localPlayer.Character
                if character then
                    character:SetPrimaryPartCFrame(character:GetPrimaryPartCFrame() * CFrame.Angles(0, math.rad(10), 0))
                end
            end
        end
    end
    -- Handle monkey climb
    HandleMonkeyClimb()
    -- Handle auto attack
    HandleAutoAttack()
    -- Handle auto respawn
    HandleAutoRespawn()
    -- Handle fling
    if flingEnabled then
        local character = localPlayer.Character
        if character and character:FindFirstChild("HumanoidRootPart") then
            local hrp = character.HumanoidRootPart
            hrp.Velocity = Vector3.new(math.random(-flingSpeed, flingSpeed), math.random(-flingSpeed, flingSpeed), math.random(-flingSpeed, flingSpeed))
        end
    end
end)

-- Connect to the Player's Chatted event
Players.LocalPlayer.Chatted:Connect(function(message)
    ProcessChatCommand(Players.LocalPlayer, message)
end)

-- Connect to UserInputService for keybinds
UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if not gameProcessed and keybinds[input.KeyCode.Name] then
        local command = keybinds[input.KeyCode.Name]
        if command == "aimlock" then
            ToggleAimLock()
        elseif command == "spin" then
            ToggleSpin()
        elseif command == "monkeyclimb" then
            ToggleMonkeyClimb()
        elseif command == "autoattack" then
            ToggleAutoAttack()
        elseif command == "walkspeed" then
            ToggleWalkSpeed(not walkSpeedEnabled, walkSpeedValue)
        elseif command == "jumpboost" then
            ToggleJumpBoost(not jumpBoostEnabled, jumpBoostValue)
        elseif command == "autorespawn" then
            ToggleAutoRespawn()
        end
    end
end)
-- Some Modules might not work, if u want you "can" modify the script BUT u must ask me for permission first! DC: hero_real
