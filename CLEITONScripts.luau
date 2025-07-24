local GuiService = game:GetService("StarterGui")

-- Criar GUI principal
local screenGui = Instance.new("ScreenGui", game.CoreGui)
screenGui.Name = "CleitonScriptsHub"

local main = Instance.new("Frame", screenGui)
main.Size = UDim2.new(0, 500, 0, 350)
main.Position = UDim2.new(0.5, -250, 0.5, -175)
main.BackgroundColor3 = Color3.fromRGB(10, 10, 10)
main.BorderColor3 = Color3.fromRGB(255, 0, 0)
main.BorderSizePixel = 2
main.Active = true
main.Draggable = true

local title = Instance.new("TextLabel", main)
title.Size = UDim2.new(1, 0, 0, 30)
title.BackgroundTransparency = 1
title.Text = "CleitonScriptsHub - NOTPETYA"
title.TextColor3 = Color3.fromRGB(255, 0, 0)
title.Font = Enum.Font.Code
title.TextSize = 18

-- Menu lateral
local side = Instance.new("Frame", main)
side.Size = UDim2.new(0, 100, 1, -30)
side.Position = UDim2.new(0, 0, 0, 30)
side.BackgroundTransparency = 1

local tabs = {"config", "players", "misc"}
local currentTab = nil

-- Conteúdo da aba
local content = Instance.new("Frame", main)
content.Size = UDim2.new(1, -100, 1, -30)
content.Position = UDim2.new(0, 100, 0, 30)
content.BackgroundTransparency = 1

-- Criar botões de abas
for i, name in ipairs(tabs) do
	local button = Instance.new("TextButton", side)
	button.Size = UDim2.new(1, -10, 0, 30)
	button.Position = UDim2.new(0, 5, 0, (i-1)*40)
	button.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
	button.Text = name
	button.TextColor3 = Color3.fromRGB(255, 0, 0)
	button.Font = Enum.Font.Code
	button.TextSize = 16
	button.BorderColor3 = Color3.fromRGB(255, 0, 0)

	button.MouseButton1Click:Connect(function()
		for _, v in pairs(content:GetChildren()) do
			v.Visible = false
		end
		if content:FindFirstChild(name) then
			content[name].Visible = true
		end
	end)
	
	-- Frame por aba
	local tabFrame = Instance.new("Frame", content)
	tabFrame.Name = name
	tabFrame.Size = UDim2.new(1, 0, 1, 0)
	tabFrame.BackgroundTransparency = 1
	tabFrame.Visible = false

	local label = Instance.new("TextLabel", tabFrame)
	label.Size = UDim2.new(1, 0, 0, 30)
	label.Text = "Aba: "..name
	label.TextColor3 = Color3.fromRGB(255, 255, 255)
	label.BackgroundTransparency = 1
	label.Font = Enum.Font.Code
	label.TextSize = 20
end

-- Ativar primeira aba por padrão
content["config"].Visible = true

-- Atalho para fechar/abrir
local toggleKey = Enum.KeyCode.RightControl
local opened = true
game:GetService("UserInputService").InputBegan:Connect(function(input, gpe)
	if gpe then return end
	if input.KeyCode == toggleKey then
		screenGui.Enabled = not screenGui.Enabled
	end
end)
